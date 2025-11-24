import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  List,
  Space,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  useCreateQuiz,
  useUpdateQuiz,
  useDeleteQuizQuestion,
} from "src/pages/admin/hooks/course/useSectionQuiz.hooks";

import QuestionModal from "./QuestionModal";

import type {
  SectionQuiz,
  CreateQuizPayload,
  SectionQuizQuestion,
} from "src/pages/admin/types/section-quiz.types";

interface Props {
  open: boolean;
  onClose: () => void;
  quiz: SectionQuiz | null;
  sectionId: string;
  courseId: string;
  refetch: () => void;
}

export default function SectionQuizDetailModal({
  open,
  onClose,
  quiz,
  sectionId,
  courseId,
  refetch,
}: Props) {
  const createQuizMutation = useCreateQuiz();
  const updateQuizMutation = useUpdateQuiz();
  const deleteQuestionMutation = useDeleteQuizQuestion();

  const [questionModal, setQuestionModal] = useState<{
    open: boolean;
    editing?: SectionQuizQuestion | null;
  }>({ open: false });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuizPayload>();

  useEffect(() => {
    if (quiz) {
      reset({
        section_id: quiz.section_id,
        course_id: quiz.course_id,
        title: quiz.title,
        passing_percentage: quiz.passing_percentage,
      });
    } else {
      reset({
        section_id: sectionId,
        course_id: courseId,
        title: "",
        passing_percentage: 80,
      });
    }
  }, [courseId, quiz, reset, sectionId]);

  const submit = (data: CreateQuizPayload) => {
    if (quiz) {
      updateQuizMutation.mutate(
        { id: quiz.id, data },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createQuizMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Modal
      title={quiz ? "Edit Quiz" : "Create Quiz"}
      open={open}
      width={800}
      onCancel={onClose}
      onOk={handleSubmit(submit)}
      centered
    >
      {/* QUIZ FORM */}
      <Form layout="vertical">
        <Form.Item
          label="Quiz Title"
          validateStatus={errors.title ? "error" : ""}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Passing Percentage (%)">
          <Controller
            name="passing_percentage"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                max={100}
                style={{ width: "100%" }}
                onChange={(val) => field.onChange(val ?? 0)}
              />
            )}
          />
        </Form.Item>
      </Form>

      {/* QUESTIONS */}
      {quiz && (
        <>
          <div className="flex justify-between items-center mt-5 mb-3">
            <strong>Questions</strong>

            {
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setQuestionModal({ open: true })}
              >
                Add Question
              </Button>
            }
          </div>

          <List
            bordered
            dataSource={quiz.questions}
            renderItem={(q, idx) => (
              <List.Item
                style={{
                  padding: "18px 16px",
                  background: "#fafafa",
                  borderRadius: 6,
                  marginBottom: 10,
                }}
                actions={[
                  <Button
                    icon={<EditOutlined />}
                    type="text"
                    onClick={() => setQuestionModal({ open: true, editing: q })}
                  />,
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    type="text"
                    onClick={() =>
                      deleteQuestionMutation.mutate(q.id, {
                        onSuccess: refetch,
                      })
                    }
                  />,
                ]}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <strong>{`${idx + 1}. ${q.question}`}</strong>

                  <div className="grid grid-cols-2 gap-y-1">
                    {q.options.map((o, i) => {
                      const label = String.fromCharCode(65 + i); // A, B, C, D

                      return (
                        <div key={o.id}>
                          <span style={{ fontWeight: 600 }}>{label}:</span>{" "}
                          <span>{o.text}</span>{" "}
                          {o.is_correct && <Tag color="green">Correct</Tag>}
                        </div>
                      );
                    })}
                  </div>
                </Space>
              </List.Item>
            )}
          />
        </>
      )}

      {/* Question Modal */}
      {questionModal.open && (
        <QuestionModal
          refetch={refetch}
          open={questionModal.open}
          onClose={() => setQuestionModal({ open: false })}
          quizId={quiz!.id}
          editing={questionModal.editing}
        />
      )}
    </Modal>
  );
}
