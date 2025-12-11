import { useState } from "react";
import { Card, Table, Button, Space, Typography, Tag, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

import PricingModal from "src/pages/admin/components/course/CoursePricing/PricingModal";
import { useGetAllPricing } from "src/pages/admin/hooks/course/useCoursePricing.hooks";
import type { PricingRow } from "src/pages/admin/types/pricing.types";

const { Title } = Typography;

export default function CoursePricingScreen() {
  const { data, isLoading } = useGetAllPricing();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<PricingRow | null>(null);
  const [searchText, setSearchText] = useState("");
  console.log(`selected`, selected);
  const rows: PricingRow[] = data ?? [];

  /** === FILTER BY ID OR COURSE NAME === */
  const filteredRows = rows.filter((row) => {
    const idMatch = row.course.id
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const titleMatch = row.course.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return idMatch || titleMatch;
  });

  const columns = [
    {
      title: "ID",
      dataIndex: ["course", "id"],
      width: 150,
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
          <Tag color="red">{sale.toLocaleString()}đ</Tag>
        ) : (
          <span>{sale.toLocaleString()}đ</span>
        );
      },
    },
    {
      title: "Discount",
      render: (_: unknown, row: PricingRow) =>
        row.pricing?.is_discount_active ? (
          <Tag color="green">
            -{row.pricing.discount_percent}%{" "}
            {row.pricing.discount_tag ? `• ${row.pricing.discount_tag}` : ""}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
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

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Course Pricing Management</Title>

      <Input
        placeholder="Search by ID or Course name..."
        style={{ marginBottom: 16, width: 300 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Card>
        <Table<PricingRow>
          rowKey={(row) => row.course.id}
          loading={isLoading}
          dataSource={filteredRows}
          columns={columns}
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
