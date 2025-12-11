import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Typography,
  Input,
  Select,
  Pagination,
  Row,
  Col,
  Space,
} from "antd";

import CreateTopicModal from "../components/CreateTopicModal";
import ForumTopicItem from "../components/ForumTopicItem";
import { useGetTopics } from "../hooks/useForum.hook";
import { useGetAllCourses } from "src/pages/admin/hooks/course/useCourse.hooks";

import type { TopicItem } from "../types/forum.types";
import type { Course } from "src/types/course.type";

const { Title } = Typography;
const { Search } = Input;

export default function ForumScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCourseId = searchParams.get("courseId") || undefined;

  /* -------------------------------------------
   * STATE: Search + Filter + Pagination
   ------------------------------------------- */
  const [search, setSearch] = useState<string>("");
  const [courseFilter, setCourseFilter] = useState<string | undefined>(
    initialCourseId
  );
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  /* -------------------------------------------
   * LOAD COURSES FOR FILTER DROPDOWN
   ------------------------------------------- */
  const { data: coursesData } = useGetAllCourses();
  const courses = coursesData?.courses || [];

  /* -------------------------------------------
   * LOAD TOPICS WITH PARAMS
   ------------------------------------------- */
  const { data, isLoading, refetch } = useGetTopics({
    search,
    courseId: courseFilter,
    page,
    limit,
  });

  const topics: TopicItem[] = data?.topics || [];
  const pagination = data?.pagination;

  /* -------------------------------------------
   * CREATE TOPIC MODAL
   ------------------------------------------- */
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div style={{ padding: 40, maxWidth: 1000, margin: "0 auto" }}>
      <Title level={3} style={{ marginBottom: 20 }}>
        Forum Discussions
      </Title>
      <Button
        type="primary"
        block
        onClick={() => setOpenModal(true)}
        style={{ width: 100, height: 40, marginBottom: 40 }}
      >
        + New Topic
      </Button>

      {/* ---------------- FILTER BAR ---------------- */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        {/* Search Input */}
        <Col span={12}>
          <Search
            placeholder="Search by title, teacher, category..."
            allowClear
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
        </Col>

        {/* Course Filter */}
        <Col span={8}>
          <Select
            allowClear
            placeholder="Filter by course"
            value={courseFilter}
            onChange={(value) => {
              setCourseFilter(value || ""); // value lúc này = courseId string
              setPage(1);
            }}
            options={courses.map((c: Course) => ({
              label: c.title,
              value: c.id, // <-- CHỈ GỬI STRING
            }))}
            style={{ width: 400 }}
          />
        </Col>

        {/* Create Topic */}
      </Row>

      <CreateTopicModal
        open={openModal}
        courseId={courseFilter}
        onClose={() => setOpenModal(false)}
        onSuccess={refetch}
      />

      {/* ---------------- TOPIC LIST ---------------- */}
      {isLoading ? (
        <div>Loading...</div>
      ) : topics.length === 0 ? (
        <div style={{ textAlign: "center", color: "#999", padding: 40 }}>
          No topics found.
        </div>
      ) : (
        topics.map((topic) => (
          <ForumTopicItem
            course_id={topic.course_id}
            key={topic.id}
            topic={topic}
            onClick={() => navigate(`/forum/topic/${topic.id}`)}
          />
        ))
      )}

      {/* ---------------- PAGINATION ---------------- */}
      {pagination && pagination.totalPages > 1 && (
        <Space style={{ marginTop: 24 }}>
          <Pagination
            current={pagination.page}
            total={pagination.total}
            pageSize={pagination.limit}
            onChange={(p) => setPage(p)}
          />
        </Space>
      )}
    </div>
  );
}
