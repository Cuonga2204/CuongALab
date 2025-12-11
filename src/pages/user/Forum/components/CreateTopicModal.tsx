import { Modal, Input, Select } from "antd";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useGetAllCourses } from "src/pages/admin/hooks/course/useCourse.hooks";
import { useAuthStore } from "src/store/authStore";
import { useCreateTopic } from "src/pages/user/Forum/hooks/useForum.hook";

import type { CreateTopicPayload } from "src/pages/user/Forum/types/forum.types";
import type { Course } from "src/types/course.type";

interface CreateTopicModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  courseId?: string; // optional
}
export default function CreateTopicModal({
  open,
  onClose,
  onSuccess,
  courseId,
}: CreateTopicModalProps) {
  const { user } = useAuthStore();
  const createTopic = useCreateTopic();

  // Load danh sách khóa học
  const { data } = useGetAllCourses();
  const courses = data?.courses || [];

  // Local states
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>(courseId || "");

  /** ===========================
   * SUBMIT: Gửi dữ liệu tạo topic
   =============================*/
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    const payload: CreateTopicPayload = {
      userId: String(user?.id),
      title,
      content,
      course_id: selectedCourse || null,
    };

    createTopic.mutate(payload, {
      onSuccess: () => {
        // Reset form
        setTitle("");
        setContent("");
        setSelectedCourse(courseId || "");

        onSuccess();
        onClose();
      },
    });
  };

  return (
    <Modal
      title="Create Topic"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={createTopic.isPending}
      width={720}
    >
      {/* Title */}
      <Input
        placeholder="Topic title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Select Course */}
      <Select
        style={{ marginTop: 12, width: "100%" }}
        placeholder="Select course (optional)"
        allowClear
        value={selectedCourse}
        onChange={(value) => setSelectedCourse(value)}
        options={courses?.map((c: Course) => ({
          label: c.title,
          value: c.id,
        }))}
      />

      {/* CKEditor */}
      <div style={{ marginTop: 16 }}>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(_: any, editor: any) => {
            setContent(editor.getData());
          }}
        />
      </div>
    </Modal>
  );
}
