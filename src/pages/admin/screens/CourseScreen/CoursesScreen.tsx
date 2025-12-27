import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Modal,
  Avatar,
  Input,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import {
  useGetAllCourses,
  useGetCoursesByTeacher,
} from "src/pages/admin/hooks/course/useCourse.hooks";
import { useDeleteCourse } from "src/pages/admin/hooks/course/useCourse.hooks";

import CourseDetailModal from "src/pages/admin/components/course/CourseDetailModal/CourseDetailModal";
import CreateCourseModal from "src/pages/admin/components/course/CreateCourseModal";

import type { Course } from "src/types/course.type";
import { Loader } from "src/components/commons/Loader/Loader";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";

import { getImageSrc } from "src/helpers/get-img-src.helpers";
import { useAuthStore } from "src/store/authStore";
import { ROLE_USER } from "src/constants/auth.constants";
import { PAGE_LIMIT_DEFAULT } from "src/constants/common.constants";
import { useSearchParams } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

export default function CoursesScreen() {
  const { user } = useAuthStore();
  const isTeacher = user?.role === ROLE_USER.TEACHER;
  const teacherId = user?.id;

  const deleteCourseMutation = useDeleteCourse();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "create"
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined
  );

  const [searchTerm, setSearchTerm] = useState("");

  /* ============================
        Pagination Sync URL
  ============================= */
  const [searchParams, setSearchParams] = useSearchParams();
  const pageUrl = Number(searchParams.get("page") || 1);
  const limitUrl = Number(searchParams.get("limit") || PAGE_LIMIT_DEFAULT);

  const [page, setPage] = useState(pageUrl);
  const limit = limitUrl;

  useEffect(() => {
    if (page > 1) {
      setSearchParams({
        page: String(page),
        limit: String(limit),
      });
    } else setSearchParams({});
  }, [page, limit, setSearchParams]);

  /* ============================
        Fetch Data (React Query)
  ============================= */

  const teacherCourses = useGetCoursesByTeacher(teacherId!, isTeacher);
  const allCourses = useGetAllCourses(page, PAGE_LIMIT_DEFAULT);

  const {
    data: coursesRes,
    isLoading,
    isError,
  } = isTeacher ? teacherCourses : allCourses;

  const courses: Course[] = isTeacher
    ? coursesRes || []
    : coursesRes?.courses || [];

  /* ============================
        Search local FE
  ============================= */
  const filteredCourses = courses.filter((course) =>
    `${course.id} ${course.title}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* ============================
        Table Columns
  ============================= */
  const columns: ColumnsType<Course> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <Space>
          <Avatar
            shape="square"
            src={getImageSrc(record.avatar)}
            style={{
              background: "linear-gradient(135deg, #1890ff 0%, #13c2c2 100%)",
            }}
          />
          <Text strong>{record.title}</Text>
        </Space>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#1890ff" }} />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  /* ============================
        Handlers
  ============================= */

  const handleView = (course: Course) => {
    setSelectedCourse(course);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleDelete = (course: Course) => {
    Modal.confirm({
      title: "Delete Course",
      content: `Are you sure you want to delete "${course.title}"?`,
      okText: "Delete",
      okType: "danger",
      centered: true,
      onOk: () => deleteCourseMutation.mutate(course.id),
    });
  };

  const handleCreate = () => {
    setSelectedCourse(undefined);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  /* ============================
        Render UI
  ============================= */

  if (isLoading) return <Loader />;
  if (isError) return <DisplayLoadApi />;

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", padding: 24 }}
    >
      {/* HEADER */}
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Space direction="vertical" size={0}>
          <Title level={2} style={{ margin: 0 }}>
            {isTeacher
              ? `Hello Teacher ${user?.name}`
              : `Hello Admin ${user?.name}`}
          </Title>
          <Paragraph style={{ color: "#8c8c8c", margin: 0 }}>
            Manage and monitor all courses
          </Paragraph>
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          size="large"
        >
          Add New Course
        </Button>
      </Space>

      {/* SEARCH BOX */}
      <Input
        placeholder="Search by ID or Title..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 280 }}
      />

      {/* TABLE */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredCourses}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: PAGE_LIMIT_DEFAULT,
            total: coursesRes?.total || 0,
            onChange: (newPage) => setPage(newPage),
            showSizeChanger: false,
          }}
        />
      </Card>

      {/* MODALS */}
      {modalOpen &&
        (modalMode === "create" ? (
          <CreateCourseModal open={modalOpen} onClose={handleClose} />
        ) : (
          <CourseDetailModal
            open={modalOpen}
            mode={modalMode}
            course={selectedCourse}
            onClose={handleClose}
          />
        ))}
    </Space>
  );
}
