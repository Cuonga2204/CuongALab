import { Table, Input, Space, Tag, Avatar, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

import CourseReviewDetailModal from "./CourseReviewDetailModal";
import {
  useGetCourseReviews,
  useGetReviewForm,
} from "../../hooks/reviewForm/useReviewForm.hooks";
import type { CourseReviewItem } from "../../types/reviewForm.types";

export default function CourseReviewTable() {
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState("");
  const [selected, setSelected] = useState<CourseReviewItem | null>(null);

  const { data, isLoading } = useGetCourseReviews({
    page,
    limit: 5,
    userId: userId || undefined,
  });
  const { data: reviewForm } = useGetReviewForm();

  const columns: ColumnsType<CourseReviewItem> = [
    {
      title: "User ID",
      render: (_, r) => r.user._id,
      ellipsis: true,
    },
    {
      title: "User",
      render: (_, r) => (
        <Space>
          <Avatar src={r.user.avatar}>{r.user.name[0]}</Avatar>
          {r.user.name}
        </Space>
      ),
    },
    {
      title: "Course",
      render: (_, r) => r.course.title,
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Satisfaction",
      render: (_, r) =>
        r.satisfaction ? (
          <Tag color="green">Yes</Tag>
        ) : (
          <Tag color="red">No</Tag>
        ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (v) => new Date(v).toLocaleString(),
    },
    {
      title: "Action",
      render: (_, r) => (
        <Button
          icon={<EyeOutlined />}
          type="link"
          onClick={() => setSelected(r)}
        />
      ),
    },
  ];

  return (
    <>
      <Input.Search
        placeholder="Search by userId"
        allowClear
        onSearch={(v) => {
          setUserId(v);
          setPage(1);
        }}
        style={{ width: 300, marginBottom: 16 }}
      />

      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={data?.items || []}
        pagination={{
          current: page,
          pageSize: 5,
          total: data?.total,
          onChange: setPage,
        }}
      />

      <CourseReviewDetailModal
        open={!!selected}
        review={selected}
        reviewForm={reviewForm}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
