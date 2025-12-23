import { Modal, Form, Input, Button, List, Space, Tag, Select } from "antd";
import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import type {
  BankOption,
  BankQuestion,
  UpdateQuestionBankPayload,
} from "../../types/question-bank.types";

import {
  useUpdateBank,
  useGetBankDetail,
} from "../../hooks/questionbank/useQuestionBank.hooks";

import { useGetAllCourses } from "../../hooks/course/useCourse.hooks";
import type { Course } from "src/types/course.type";

interface Props {
  formId: string;
  onClose: () => void;
}

export default function QuestionBankDetailModal({ formId, onClose }: Props) {
  const { data: form, refetch } = useGetBankDetail(formId);
  const { data: coursesData } = useGetAllCourses();
  const courses = coursesData?.courses ?? [];

  const updateMutation = useUpdateBank();

  /* =======================
      FORM STATE
  ======================= */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState<string | null>(null);

  /* =======================
      QUESTIONS STATE
  ======================= */
  const [questions, setQuestions] = useState<BankQuestion[]>([]);

  /* =======================
      ADD QUESTION STATE
  ======================= */
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState<BankOption[]>([
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);

  /* =======================
      EDIT QUESTION STATE
  ======================= */
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingQuestion, setEditingQuestion] = useState("");
  const [editingOptions, setEditingOptions] = useState<BankOption[]>([]);

  /* =======================
      SYNC DATA FROM API
  ======================= */
  useEffect(() => {
    if (!form) return;

    setTitle(form.title);
    setDescription(form.description ?? "");

    if (typeof form.course_id === "string") {
      setCourseId(form.course_id);
    } else if (form.course_id && typeof form.course_id === "object") {
      setCourseId(form.course_id.id);
    } else {
      setCourseId(null);
    }

    setQuestions(form.questions ?? []);
  }, [form]);

  if (!form) return null;

  /* =======================
      SAVE FORM (MAIN ACTION)
  ======================= */
  const saveForm = () => {
    const payload: UpdateQuestionBankPayload = {
      title,
      description,
      course_id: courseId,
      questions,
    };

    updateMutation.mutate(
      { id: formId, payload },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  /* =======================
      ADD QUESTION
  ======================= */
  const addNewQuestion = () => {
    if (!newQuestion.trim()) return;

    const newBankQuestion: BankQuestion = {
      question: newQuestion,
      options: options.map((o) => ({ ...o })),
    };

    setQuestions((prev) => [...prev, newBankQuestion]);

    setNewQuestion("");
    setOptions([
      { text: "", is_correct: false },
      { text: "", is_correct: false },
    ]);
  };
  const addOption = () =>
    setOptions((prev) => [...prev, { text: "", is_correct: false }]);

  /* =======================
      EDIT QUESTION
  ======================= */
  const openEditQuestion = (q: BankQuestion, index: number) => {
    setEditingIndex(index);
    setEditingQuestion(q.question);
    setEditingOptions(q.options.map((o) => ({ ...o })));
  };

  const saveEditingQuestion = () => {
    if (editingIndex === null) return;

    setQuestions((prev) => {
      const copy = [...prev];
      copy[editingIndex] = {
        ...copy[editingIndex],
        question: editingQuestion,
        options: editingOptions,
      };
      return copy;
    });

    setEditingIndex(null);
  };

  /* =======================
      RENDER
  ======================= */
  return (
    <Modal
      title={`Form: ${form.title}`}
      open
      width={900}
      onCancel={onClose}
      onOk={saveForm}
      okText="Save"
    >
      {/* FORM INFO */}
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item label="Description">
          <Input.TextArea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Course (optional)">
          <Select
            allowClear
            value={courseId ?? undefined}
            onChange={(v) => setCourseId(v ?? null)}
            options={courses.map((c: Course) => ({
              value: c.id,
              label: c.title,
            }))}
          />
        </Form.Item>
      </Form>

      {/* QUESTIONS LIST */}
      <h3 className="mt-4 mb-2">Questions</h3>

      <List
        bordered
        dataSource={questions}
        renderItem={(q, index) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => openEditQuestion(q, index)}
              />,
              <Button
                key="delete"
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={() =>
                  setQuestions((prev) => prev.filter((_, i) => i !== index))
                }
              />,
            ]}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <strong>
                {index + 1}. {q.question}
              </strong>

              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, i) => (
                  <div key={i}>
                    {String.fromCharCode(65 + i)}: {opt.text}{" "}
                    {opt.is_correct && <Tag color="green">Correct</Tag>}
                  </div>
                ))}
              </div>
            </Space>
          </List.Item>
        )}
      />

      {/* ADD QUESTION */}
      <div className="mt-6 p-4 border rounded">
        <h4>Add New Question</h4>

        <Input
          placeholder="Question text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        <div className="mt-3">
          {options.map((opt, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Input
                style={{ flex: 1 }}
                value={opt.text}
                placeholder={`Option ${idx + 1}`}
                onChange={(e) => {
                  const copy = [...options];
                  copy[idx].text = e.target.value;
                  setOptions(copy);
                }}
              />

              <input
                type="checkbox"
                checked={opt.is_correct}
                onChange={(e) => {
                  const copy = [...options];
                  copy[idx].is_correct = e.target.checked;
                  setOptions(copy);
                }}
              />
            </div>
          ))}

          <Button icon={<PlusOutlined />} block onClick={addOption}>
            Add Option
          </Button>
        </div>

        <Button
          type="primary"
          className="mt-3"
          disabled={!newQuestion}
          onClick={addNewQuestion}
        >
          Add Question
        </Button>
      </div>

      {/* EDIT QUESTION MODAL */}
      <Modal
        title={
          editingIndex !== null
            ? `Edit Question #${editingIndex + 1}`
            : "Edit Question"
        }
        open={editingIndex !== null}
        onCancel={() => setEditingIndex(null)}
        onOk={saveEditingQuestion}
      >
        <Input
          placeholder="Question text"
          className="mb-3"
          value={editingQuestion}
          onChange={(e) => setEditingQuestion(e.target.value)}
        />

        {editingOptions.map((opt, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <Input
              style={{ flex: 1 }}
              value={opt.text}
              placeholder={`Option ${idx + 1}`}
              onChange={(e) => {
                const copy = [...editingOptions];
                copy[idx].text = e.target.value;
                setEditingOptions(copy);
              }}
            />

            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={opt.is_correct}
                onChange={(e) => {
                  const copy = [...editingOptions];
                  copy[idx].is_correct = e.target.checked;
                  setEditingOptions(copy);
                }}
              />
              <span>Correct</span>
            </label>
          </div>
        ))}

        <Button
          icon={<PlusOutlined />}
          block
          onClick={() =>
            setEditingOptions((prev) => [
              ...prev,
              { text: "", is_correct: false },
            ])
          }
        >
          Add Option
        </Button>
      </Modal>
    </Modal>
  );
}
