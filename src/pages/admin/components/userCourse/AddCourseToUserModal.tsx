import { Modal, Input, Button, Select, Divider } from "antd";
import { useState } from "react";
import { useAddCourseToUser } from "../../hooks/userCourse/useUserCourse.hooks";
import { useGetAllCourses } from "src/pages/admin/hooks/course/useCourse.hooks";
import type { Course } from "src/types/course.type";

interface Props {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export default function AddCourseToUserModal({ open, onClose, userId }: Props) {
  const [courseId, setCourseId] = useState("");
  const addMutation = useAddCourseToUser();

  // 🔹 Optional dropdown
  const { data, isLoading } = useGetAllCourses();
  const courses: Course[] = data?.courses || [];

  const handleSubmit = () => {
    addMutation.mutate(
      { userId, courseId },
      {
        onSuccess: () => {
          setCourseId("");
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      title="Add Course to User"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      {/* ===== INPUT ID ===== */}
      <Input
        placeholder="Nhập Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />

      <Divider plain>Hoặc chọn nhanh</Divider>

      {/* ===== DROPDOWN GỢI Ý ===== */}
      <Select
        showSearch
        loading={isLoading}
        placeholder="Chọn course (tự động điền ID)"
        optionFilterProp="label"
        style={{ width: "100%" }}
        onChange={(value) => setCourseId(value)}
        options={courses.map((c) => ({
          label: c.title,
          value: c.id,
        }))}
      />

      <Button
        type="primary"
        block
        className="mt-3"
        disabled={!courseId}
        loading={addMutation.isPending}
        onClick={handleSubmit}
      >
        Add Course
      </Button>
    </Modal>
  );
}
