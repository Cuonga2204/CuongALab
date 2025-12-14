import { Modal, Form, Input, Button, List, Space, Tag, Select } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import type {
  BankOption,
  AddBankQuestionPayload,
  UpdateQuestionBankPayload,
  BankQuestion,
} from "../../types/question-bank.types";

import {
  useUpdateBank,
  useDeleteBankQuestion,
  useAddBankQuestion,
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
  const addQuestionMutation = useAddBankQuestion();
  const deleteQuestionMutation = useDeleteBankQuestion();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState<string | null>(null);

  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState<BankOption[]>([
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);

  // ❗ FIX LỖI: Sync state khi form data load từ API
  useEffect(() => {
    if (form) {
      setTitle(form.title);
      setDescription(form.description ?? "");
      setCourseId(form.course_id ?? null);
    }
  }, [form]);

  if (!form) return null;

  const saveForm = () => {
    const payload: UpdateQuestionBankPayload = {
      title,
      description,
      course_id: courseId,
    };
    updateMutation.mutate(
      { id: formId, payload },
      { onSuccess: () => refetch() }
    );
  };

  const addOption = () =>
    setOptions((prev) => [...prev, { text: "", is_correct: false }]);

  const addNewQuestion = () => {
    const payload: AddBankQuestionPayload = {
      formId,
      question: newQuestion,
      options,
    };

    addQuestionMutation.mutate(payload, {
      onSuccess: () => {
        setNewQuestion("");
        setOptions([
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ]);
        refetch();
      },
    });
  };

  return (
    <Modal
      title={`Form: ${form.title}`}
      open
      width={900}
      onCancel={onClose}
      onOk={saveForm}
    >
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

      <h3 className="mt-4 mb-2">Questions</h3>

      <List
        bordered
        dataSource={form.questions}
        renderItem={(q: BankQuestion, index: number) => (
          <List.Item
            actions={[
              <Button
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={() =>
                  deleteQuestionMutation.mutate(
                    { formId, index },
                    { onSuccess: () => refetch() }
                  )
                }
              />,
            ]}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <strong>
                {index + 1}. {q.question}
              </strong>

              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt: BankOption, i: number) => (
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

      {/* Add Question */}
      <div className="mt-6 p-4 border rounded">
        <h4>Add New Question</h4>

        <Input
          placeholder="Question text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        <div className="mt-3">
          {options.map((opt: BankOption, idx: number) => (
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
    </Modal>
  );
}
