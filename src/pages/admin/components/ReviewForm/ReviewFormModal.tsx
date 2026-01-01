import { Modal, Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import ReviewQuestionCard from "./ReviewQuestionCard";
import ReviewQuestionModal from "./ReviewQuestionModal";
import type {
  ReviewQuestion,
  ReviewQuestionDraft,
} from "../../types/reviewForm.types";

const { Title } = Typography;

interface Props {
  open: boolean;
  initialQuestions: ReviewQuestion[];
  onClose: () => void;
  onSave: (q: ReviewQuestion[]) => void;
}

export default function ReviewFormModal({
  open,
  initialQuestions,
  onClose,
  onSave,
}: Props) {
  const [questions, setQuestions] = useState<ReviewQuestion[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [openQ, setOpenQ] = useState(false);

  useEffect(() => {
    if (open) {
      setQuestions(initialQuestions || []);
    }
  }, [open, initialQuestions]);

  const handleSubmitQuestion = (draft: ReviewQuestionDraft) => {
    if (editingIndex !== null) {
      // ===== EDIT =====
      const clone = [...questions];
      clone[editingIndex] = {
        ...clone[editingIndex],
        label: draft.label,
        options: draft.options,
      };
      setQuestions(clone);
    } else {
      // ===== ADD (KHÔNG ID) =====
      setQuestions([
        ...questions,
        {
          label: draft.label,
          options: draft.options,
        },
      ]);
    }

    setEditingIndex(null);
    setOpenQ(false);
  };

  return (
    <Modal
      open={open}
      width={900}
      title="Configure Course Review Form"
      onCancel={onClose}
      onOk={() => onSave(questions)}
    >
      {/* ===== DEFAULT QUESTIONS ===== */}
      <Title level={5}>Default questions</Title>

      <ReviewQuestionCard
        index={1}
        readOnly
        question={{
          id: "rating",
          label: "⭐ Rating (1–5)",
          options: ["1", "2", "3", "4", "5"],
        }}
      />

      <ReviewQuestionCard
        index={2}
        readOnly
        question={{
          id: "satisfaction",
          label: "🙂 Satisfaction",
          options: ["Yes", "No"],
        }}
      />

      <ReviewQuestionCard
        index={3}
        readOnly
        question={{
          id: "comment",
          label: "📝 Comment",
          options: ["Textarea"],
        }}
      />

      {/* ===== CUSTOM QUESTIONS ===== */}
      <Title level={5} style={{ marginTop: 24 }}>
        Custom questions
      </Title>

      {questions.map((q, idx) => (
        <ReviewQuestionCard
          key={q.id ?? `temp-${idx}`} // 🔥 FIX MẤT CÂU
          index={idx + 4}
          question={q}
          onEdit={() => {
            setEditingIndex(idx);
            setOpenQ(true);
          }}
          onDelete={() => setQuestions(questions.filter((_, i) => i !== idx))}
        />
      ))}

      <Button
        type="dashed"
        icon={<PlusOutlined />}
        block
        onClick={() => {
          setEditingIndex(null);
          setOpenQ(true);
        }}
      >
        Add Question
      </Button>

      <ReviewQuestionModal
        open={openQ}
        initial={editingIndex !== null ? questions[editingIndex] : undefined}
        onCancel={() => setOpenQ(false)}
        onSubmit={handleSubmitQuestion}
      />
    </Modal>
  );
}
