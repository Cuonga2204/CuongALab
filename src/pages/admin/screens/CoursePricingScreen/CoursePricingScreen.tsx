import { useState } from "react";
import { Card, Table, Button, Space, Typography, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";

import PricingModal from "src/pages/admin/components/course/CoursePricing/PricingModal";
import { useGetAllPricing } from "src/pages/admin/hooks/course/useCoursePricing.hooks";

import type { ColumnsType } from "antd/es/table";
import type { PricingRow } from "src/pages/admin/types/pricing.types";

const { Title } = Typography;

export default function CoursePricingScreen() {
  /* ===============================
     STATE: PAGINATION + MODAL
  =============================== */
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<PricingRow | null>(null);

  /* ===============================
     FETCH DATA (SERVER PAGINATION)
  =============================== */
  const { data, isLoading } = useGetAllPricing({
    page,
    limit: pageSize,
  });

  const rows: PricingRow[] = data?.data ?? [];
  const pagination = data?.pagination;

  /* ===============================
     TABLE COLUMNS
  =============================== */
  const columns: ColumnsType<PricingRow> = [
    {
      title: "ID",
      dataIndex: ["course", "id"],
      width: 160,
      render: (id: string) => <span style={{ color: "#555" }}>{id}</span>,
    },
    {
      title: "Course",
      dataIndex: "course",
      render: (course: PricingRow["course"]) => (
        <Space direction="vertical" size={0}>
          <b>{course.title}</b>
          <span style={{ fontSize: 12, color: "#777" }}>
            GV: {course.name_teacher}
          </span>
        </Space>
      ),
    },
    {
      title: "Base Price",
      render: (_: unknown, row: PricingRow) => (
        <b>
          {(row.pricing?.base_price ?? row.course.price_old)?.toLocaleString()}đ
        </b>
      ),
    },
    {
      title: "Sale Price",
      render: (_: unknown, row: PricingRow) => {
        const sale = row.pricing?.sale_price ?? row.course.price_current;

        return row.pricing?.is_discount_active ? (
          <Tag color="red">{sale?.toLocaleString()}đ</Tag>
        ) : (
          <span>{sale?.toLocaleString()}đ</span>
        );
      },
    },
    {
      title: "Discount",
      render: (_: unknown, row: PricingRow) =>
        row.pricing?.is_discount_active ? (
          <Tag color="green">
            -{row.pricing.discount_percent}%
            {row.pricing.discount_tag ? ` • ${row.pricing.discount_tag}` : ""}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      width: 100,
      render: (_: unknown, row: PricingRow) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => {
            setSelected(row);
            setOpen(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  /* ===============================
     RENDER
  =============================== */
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Course Pricing Management</Title>

      <Card>
        <Table<PricingRow>
          rowKey={(row) => row.course.id}
          loading={isLoading}
          dataSource={rows}
          columns={columns}
          pagination={{
            current: page,
            pageSize,
            total: pagination?.total,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50],
            showTotal: (total) => `Total ${total} courses`,
            onChange: (p, ps) => {
              setPage(p);
              setPageSize(ps);
            },
          }}
        />
      </Card>

      {open && selected && (
        <PricingModal
          open={open}
          onClose={() => setOpen(false)}
          course={selected.course}
          pricing={selected.pricing}
        />
      )}
    </div>
  );
}
