import { Button, Card, Space, Typography, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import {
  useDeleteQuiz,
  useGetQuizBySection,
} from "src/pages/admin/hooks/course/useSectionQuiz.hooks";
import SectionQuizDetailModal from "./SectionQuizDetailModal";
import type { SectionQuiz } from "src/pages/admin/types/section-quiz.types";

const { Text } = Typography;

interface SectionQuizManagerProps {
  sectionId: string;
  courseId: string;
}

export default function SectionQuizManager({
  sectionId,
  courseId,
}: SectionQuizManagerProps) {
  const { data: quizzes = [], refetch } = useGetQuizBySection(sectionId);

  const deleteMutation = useDeleteQuiz();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<SectionQuiz | null>(null);

  const openCreateModal = () => {
    setEditingQuiz(null);
    setModalOpen(true);
  };

  const openEditModal = (quiz: SectionQuiz) => {
    setEditingQuiz(quiz);
    setModalOpen(true);
  };
  const handleDeleteQuiz = (id: string) => {
    Modal.confirm({
      title: "Delete this quiz?",
      onOk: () => {
        deleteMutation.mutate(id);
      },
    });
  };

  useEffect(() => {
    if (!editingQuiz) return;

    const updated = quizzes.find((q) => q.id === editingQuiz.id);
    if (updated) setEditingQuiz(updated);
  }, [editingQuiz, quizzes]);

  return (
    <Card style={{ marginTop: 12 }}>
      <div className="flex justify-between items-center mb-3">
        <Text strong>Section Quiz</Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateModal}
        >
          Add Quiz
        </Button>
      </div>

      {quizzes.length === 0 && (
        <Text type="secondary">No quiz for this section yet.</Text>
      )}

      {quizzes.map((quiz) => (
        <Card
          key={quiz.id}
          size="small"
          style={{
            border: "1px solid #eee",
            marginBottom: 12,
            cursor: "pointer",
          }}
          onClick={() => openEditModal(quiz)}
        >
          <div className="flex justify-between">
            <strong>{quiz.title}</strong>

            {
              <Space>
                <Button
                  icon={<EditOutlined />}
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(quiz);
                  }}
                />

                <Button
                  danger
                  icon={<DeleteOutlined />}
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteQuiz(quiz.id);
                  }}
                />
              </Space>
            }
          </div>
        </Card>
      ))}

      {modalOpen && (
        <SectionQuizDetailModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          quiz={editingQuiz}
          sectionId={sectionId}
          courseId={courseId}
          refetch={refetch}
        />
      )}
    </Card>
  );
}
