import { Modal, Form, Input, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import {
  useCreateQuizQuestion,
  useUpdateQuizQuestion,
} from "src/pages/admin/hooks/course/useSectionQuiz.hooks";

import type {
  QuizOption,
  SectionQuizQuestion,
} from "src/pages/admin/types/section-quiz.types";

interface Props {
  open: boolean;
  onClose: () => void;
  quizId: string;
  editing?: SectionQuizQuestion | null;
  refetch: () => void;
}

export default function QuestionModal({
  open,
  onClose,
  quizId,
  editing,
  refetch,
}: Props) {
  const createMutation = useCreateQuizQuestion();
  const updateMutation = useUpdateQuizQuestion();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<QuizOption[]>([]);

  useEffect(() => {
    if (editing) {
      setQuestion(editing.question);
      setOptions(editing.options);
    } else {
      setQuestion("");
      setOptions([
        { id: "", text: "", is_correct: false },
        { id: "", text: "", is_correct: false },
      ]);
    }
  }, [editing]);

  const addOption = () =>
    setOptions((prev) => [...prev, { id: "", text: "", is_correct: false }]);

  const removeOption = (i: number) =>
    setOptions((prev) => prev.filter((_, index) => index !== i));

  const submit = () => {
    if (!editing) {
      createMutation.mutate(
        { section_quiz_id: quizId, question, options },
        {
          onSuccess: () => {
            refetch();
            onClose();
          },
        }
      );
    } else {
      updateMutation.mutate(
        {
          id: editing.id,
          data: { question, options, section_quiz_id: quizId },
          quizId,
        },
        {
          onSuccess: () => {
            refetch();
            onClose();
          },
        }
      );
    }
  };

  return (
    <Modal
      title={editing ? "Edit Question" : "Add Question"}
      open={open}
      onCancel={onClose}
      onOk={submit}
      width={650}
      centered
    >
      <Form layout="vertical">
        <Form.Item label="Question">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Options">
          {options.map((opt, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                style={{ flex: 1 }}
                placeholder={`Option ${index + 1}`}
                value={opt.text}
                onChange={(e) => {
                  const arr = [...options];
                  arr[index].text = e.target.value;
                  setOptions(arr);
                }}
              />

              <input
                type="checkbox"
                checked={opt.is_correct}
                onChange={(e) => {
                  const arr = [...options];
                  arr[index].is_correct = e.target.checked;
                  setOptions(arr);
                }}
              />

              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => removeOption(index)}
                disabled={options.length <= 2}
              />
            </div>
          ))}

          <Button icon={<PlusOutlined />} block onClick={addOption}>
            Add Option
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
