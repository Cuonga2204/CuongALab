import { Modal, List, Button, Tag, Popconfirm } from "antd";
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import type { UserCourseRecord } from "../../types/user-course.types";
import AddCourseToUserModal from "./AddCourseToUserModal";
import { useDeleteUserCourse } from "../../hooks/userCourse/useUserCourse.hooks";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  courses: UserCourseRecord[];
  onSelectCourse: (courseId: string) => void;
  userId: string;
}

export default function UserCourseDetailModal({
  open,
  onClose,
  courses,
  onSelectCourse,
  userId,
}: Props) {
  const deleteMutation = useDeleteUserCourse();
  const [addOpen, setAddOpen] = useState(false);

  return (
    <Modal
      title="Purchased Courses"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        block
        className="mb-3"
        onClick={() => setAddOpen(true)}
      >
        Add Course
      </Button>

      <List
        dataSource={courses}
        renderItem={(c) => {
          const course = c.course_id;

          return (
            <List.Item
              actions={[
                <EyeOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelectCourse(course.id)}
                />,
                <Popconfirm
                  title="Remove this course?"
                  onConfirm={() => deleteMutation.mutate(c.id)}
                >
                  <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={<img src={course.avatar} style={{ width: 48 }} />}
                title={
                  <>
                    {course.title}
                    <Tag
                      color={c.status === "completed" ? "green" : "orange"}
                      style={{ marginLeft: 8 }}
                    >
                      {c.status}
                    </Tag>
                  </>
                }
                description={`Progress: ${c.progress}%`}
              />
            </List.Item>
          );
        }}
      />

      <AddCourseToUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        userId={userId}
      />
    </Modal>
  );
}
