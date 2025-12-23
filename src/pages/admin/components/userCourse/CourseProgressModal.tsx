import { Modal, List, Tag } from "antd";
import type { LectureProgressItem } from "../../types/user-course.types";

interface Props {
  open: boolean;
  onClose: () => void;
  progress: LectureProgressItem[];
}

export default function CourseProgressModal({
  open,
  onClose,
  progress,
}: Props) {
  return (
    <Modal
      title="Lecture Progress"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <List
        dataSource={progress}
        renderItem={(item) => (
          <List.Item>
            <strong>Lecture {item.lecture_id}</strong>
            <Tag color={item.is_completed ? "green" : "orange"}>
              {item.percentage_watched}%
            </Tag>
          </List.Item>
        )}
      />
    </Modal>
  );
}
