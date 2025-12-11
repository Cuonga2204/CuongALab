import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Modal,
  Tag,
  Input,
  DatePicker,
} from "antd";
import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

import {
  useDeletePayment,
  useGetPayments,
} from "src/pages/admin/hooks/payment/usePayment.hooks";

import PaymentDetailModal from "src/pages/admin/components/payment/PaymentDetailModal";
import type { Payment } from "src/types/payment.types";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function PaymentsScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageUrl = Number(searchParams.get("page") || 1);

  const [page, setPage] = useState(pageUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const { data: paymentsRes, isLoading } = useGetPayments(page, 10);
  const deletePaymentMutation = useDeletePayment();

  const payments = paymentsRes?.payments ?? [];

  // Sync URL
  useEffect(() => {
    if (page > 1) {
      setSearchParams({
        page: String(page),
        limit: "10",
      });
    } else {
      setSearchParams({});
    }
  }, [page, setSearchParams]);

  // ==============================
  // 🔍 FILTER FUNCTION
  // ==============================
  const filteredPayments = payments.filter((p: Payment) => {
    const matchText =
      p.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.paymentUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.paymentUser.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDate = dateRange
      ? dayjs(p.createdAt).isAfter(dateRange[0].startOf("day")) &&
        dayjs(p.createdAt).isBefore(dateRange[1].endOf("day"))
      : true;

    return matchText && matchDate;
  });

  // ==============================
  // TABLE COLUMNS
  // ==============================
  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      width: 400,
      ellipsis: true,
    },
    {
      title: "User",
      width: 300,
      render: (p: Payment) => `${p.paymentUser.name} (${p.paymentUser.email})`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (v: number) => v.toLocaleString() + "đ",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (t: string) => (
        <Tag color={t === "single" ? "blue" : "green"}>{t}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s: string) => (
        <Tag color={s === "success" ? "green" : "red"}>{s}</Tag>
      ),
    },
    {
      title: "Actions",
      render: (_: unknown, record: Payment) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedPayment(record.id);
              setModalOpen(true);
            }}
          />

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              Modal.confirm({
                title: "Delete payment?",
                onOk: () => deletePaymentMutation.mutate(record.id),
              })
            }
          />
        </Space>
      ),
    },
  ];

  // ==============================

  return (
    <Space direction="vertical" style={{ width: "100%", padding: 24 }}>
      <Typography.Title level={2}>Payments</Typography.Title>

      {/* 🔍 SEARCH + DATE FILTER */}
      <Space style={{ marginBottom: 16 }} size="large" wrap>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by Order ID / User Name / Email"
          style={{ width: 300 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <RangePicker
          value={dateRange}
          onChange={(v) => setDateRange(v)}
          format="YYYY-MM-DD"
        />

        <Button onClick={() => setDateRange(null)}>Clear Date</Button>
      </Space>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredPayments}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: page,
            total: paymentsRes?.total ?? 0,
            pageSize: 10,
            onChange: (p) => setPage(p),
          }}
        />
      </Card>

      <PaymentDetailModal
        open={modalOpen}
        id={selectedPayment}
        onClose={() => setModalOpen(false)}
      />
    </Space>
  );
}
