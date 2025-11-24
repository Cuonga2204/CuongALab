import { useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Modal,
  Avatar,
  Tag,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  useGetAllCourses,
  useGetCoursesByTeacher,
} from "src/pages/admin/hooks/course/useCourse.hooks";
import { useDeleteCourse } from "src/pages/admin/hooks/course/useCourse.hooks";
import CourseDetailModal from "src/pages/admin/components/course/CourseDetailModal/CourseDetailModal";
import type { Course } from "src/types/course.type";
import { Loader } from "src/components/commons/Loader/Loader";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { getImageSrc } from "src/helpers/get-img-src.helpers";
import { getPrice } from "src/helpers/getPrice.helper";
import { useAuthStore } from "src/store/authStore";
import { ROLE_USER } from "src/constants/auth.constants";
import CreateCourseModal from "src/pages/admin/components/course/CreateCourseModal";

const { Title, Paragraph, Text } = Typography;

export default function CoursesScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "create"
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined
  );

  const deleteCourseMutation = useDeleteCourse();
  const { user } = useAuthStore();
  const isTeacher = user?.role === ROLE_USER.TEACHER;
  const teacherId = user?.id;

  const allCourses = useGetAllCourses();
  const teacherCourses = useGetCoursesByTeacher(teacherId!, isTeacher);

  const {
    data: courses,
    isLoading,
    isError,
  } = isTeacher
    ? {
        data: teacherCourses.data || [],
        isLoading: teacherCourses.isLoading,
        isError: teacherCourses.isError,
      }
    : {
        data: allCourses.data?.courses || [],
        isLoading: allCourses.isLoading,
        isError: allCourses.isError,
      };

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
      cancelText: "Cancel",
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

  const columns: ColumnsType<Course> = [
    {
      title: "Course",
      dataIndex: "title",
      key: "title",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Course) => (
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price_current",
      key: "price_current",
      render: (price_current: number) => getPrice(price_current),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Course) => (
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

  if (isLoading) return <Loader />;

  if (isError) return <DisplayLoadApi />;

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", padding: 24 }}
    >
      {/* Header */}
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Space direction="vertical" size={0}>
          <Title level={2} style={{ margin: 0 }}>
            {isTeacher
              ? `Hello Teacher  ${user?.name}`
              : `Hello Admin ${user?.name}`}
          </Title>
          <Paragraph style={{ margin: 0, color: "#8c8c8c" }}>
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

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={courses}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Modals */}
      {modalOpen &&
        (modalMode === "create" ? (
          <CreateCourseModal
            open={modalOpen}
            mode="create"
            course={selectedCourse}
            onClose={handleClose}
            onSubmit={() => {}}
          />
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
