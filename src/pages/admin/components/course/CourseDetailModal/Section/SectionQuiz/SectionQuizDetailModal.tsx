import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  List,
  Space,
  Tag,
  Card,
} from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import {
  useCreateQuiz,
  useUpdateQuiz,
  useDeleteQuizQuestion,
} from "src/pages/admin/hooks/course/useSectionQuiz.hooks";

import {
  useImportBankToQuiz,
  useGetAllQuestionBanks,
} from "src/pages/admin/hooks/questionbank/useQuestionBank.hooks";

import { QuestionBankApi } from "src/pages/admin/api/question-bank.api";

import QuestionModal from "./QuestionModal";

import type {
  SectionQuiz,
  CreateQuizPayload,
  SectionQuizQuestion,
} from "src/pages/admin/types/section-quiz.types";

import type { QuestionBank } from "src/pages/admin/types/question-bank.types";

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

  // IMPORT FROM BANK
  const importMutation = useImportBankToQuiz();
  const { data: banks = [] } = useGetAllQuestionBanks();

  // For modal import
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [previewBank, setPreviewBank] = useState<QuestionBank | null>(null);

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

  // Load quiz data into form
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
  }, [quiz, reset, sectionId, courseId]);

  // Create / Update Quiz
  const submit = (data: CreateQuizPayload) => {
    if (quiz) {
      updateQuizMutation.mutate(
        { id: quiz.id, data },
        { onSuccess: () => onClose() }
      );
    } else {
      createQuizMutation.mutate(data, {
        onSuccess: () => onClose(),
      });
    }
  };

  // IMPORT FORM
  const handleImport = (formId: string) => {
    if (!quiz?.id) return;

    importMutation.mutate(
      { quizId: quiz.id, formId },
      {
        onSuccess: () => {
          refetch();
          setBankModalOpen(false);
          setPreviewBank(null);
          setSearchId("");
        },
      }
    );
  };

  // Fetch bank detail by ID
  const fetchBankById = async (id: string) => {
    try {
      const res = await QuestionBankApi.getDetail(id);
      setPreviewBank(res);
    } catch {
      setPreviewBank(null);
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

      {/* ================= QUESTIONS LIST ================= */}
      {quiz && (
        <>
          <div className="flex justify-between items-center mt-5 mb-3">
            <strong>Questions</strong>

            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setQuestionModal({ open: true })}
              >
                Add Question
              </Button>

              <Button onClick={() => setBankModalOpen(true)}>
                Import From Bank
              </Button>

              <Button
                danger
                onClick={() => {
                  Modal.confirm({
                    title: "Clear all questions?",
                    onOk: () =>
                      quiz.questions.forEach((q) =>
                        deleteQuestionMutation.mutate(q.id, {
                          onSuccess: refetch,
                        })
                      ),
                  });
                }}
              >
                Clear All
              </Button>
            </Space>
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
                      const label = String.fromCharCode(65 + i); // A, B, C ...

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

      {/* ================= QUESTION MODAL ================= */}
      {questionModal.open && quiz && (
        <QuestionModal
          refetch={refetch}
          open={questionModal.open}
          onClose={() => setQuestionModal({ open: false })}
          quizId={quiz.id}
          editing={questionModal.editing}
        />
      )}

      {/* ===========================================================
          IMPORT QUESTION BANK MODAL
      ============================================================ */}
      <Modal
        open={bankModalOpen}
        title="Import Question Bank"
        onCancel={() => {
          setBankModalOpen(false);
          setSearchId("");
          setPreviewBank(null);
        }}
        footer={null}
        width={750}
      >
        {/* ENTER ID */}
        <Form layout="vertical">
          <Form.Item label="Enter Question Bank ID">
            <Input.Search
              placeholder="Paste Question Bank ID"
              enterButton="Load"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onSearch={(value) => fetchBankById(value.trim())}
            />
          </Form.Item>
        </Form>

        {/* PREVIEW FROM ID */}
        {previewBank && (
          <Card style={{ marginTop: 12, padding: 12 }}>
            <h3>{previewBank.title}</h3>
            <p style={{ marginTop: -4, color: "#666" }}>
              {previewBank.questions.length} questions
            </p>

            {/* QUESTIONS */}
            <div
              style={{ maxHeight: 250, overflowY: "auto", paddingRight: 10 }}
            >
              {previewBank.questions.map((q, idx) => (
                <Card
                  key={idx}
                  size="small"
                  style={{
                    background: "#fafafa",
                    marginBottom: 10,
                    borderRadius: 6,
                  }}
                >
                  <strong>
                    {idx + 1}. {q.question}
                  </strong>
                  <div style={{ marginTop: 8, marginLeft: 10 }}>
                    {q.options.map((opt, i) => (
                      <div key={i}>
                        {String.fromCharCode(65 + i)}: {opt.text}{" "}
                        {opt.is_correct && <Tag color="green">Correct</Tag>}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Button
              type="primary"
              block
              style={{ marginTop: 15 }}
              onClick={() => handleImport(previewBank.id)}
            >
              Import This Form
            </Button>
          </Card>
        )}

        {/* LIST ALL BANKS */}
        <h4 style={{ marginTop: 20 }}>Or select from list:</h4>

        <List
          bordered
          dataSource={banks}
          renderItem={(bank: QuestionBank) => (
            <List.Item
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <strong>{bank.title}</strong>
                <span style={{ marginLeft: 8, color: "#666" }}>
                  ({bank.questions.length} questions)
                </span>
              </div>

              {/* 👁 EYE ICON FOR PREVIEW */}
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => setPreviewBank(bank)}
              />

              {/* IMPORT WITHOUT PREVIEW (optional) */}
              <Button type="link" danger onClick={() => handleImport(bank.id)}>
                Import
              </Button>
            </List.Item>
          )}
        />
      </Modal>
    </Modal>
  );
}
