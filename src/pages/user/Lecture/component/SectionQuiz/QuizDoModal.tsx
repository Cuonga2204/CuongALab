import { Modal, Button, Alert, Divider } from "antd";
import { useState } from "react";
import { useSubmitQuiz } from "src/pages/admin/hooks/course/useSectionQuiz.hooks";
import type {
  SectionQuiz,
  SectionQuizQuestion,
} from "src/pages/admin/types/section-quiz.types";

interface QuizDoModalProps {
  quiz: SectionQuiz;
  sectionId: string;
  courseId: string;
  userId: string;
  onClose: () => void;
}

interface AnswerMap {
  [questionId: string]: string[];
}

export default function QuizDoModal({
  quiz,
  sectionId,
  courseId,
  userId,
  onClose,
}: QuizDoModalProps) {
  const submitMutation = useSubmitQuiz();

  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitResult, setSubmitResult] = useState<{
    percentage: number;
    is_passed: boolean;
  } | null>(null);

  const [showCorrect, setShowCorrect] = useState(false);

  /* ======================
      SELECT OPTION
  ====================== */
  const toggleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];

      return { ...prev, [questionId]: updated };
    });
  };

  /* ======================
        SUBMIT QUIZ
  ====================== */
  const handleSubmit = () => {
    submitMutation.mutate(
      {
        user_id: userId,
        course_id: courseId,
        section_id: sectionId,
        section_quiz_id: quiz.id,
        answers: Object.entries(answers).map(([qid, opts]) => ({
          question_id: qid,
          selected_option_ids: opts,
        })),
        questions: quiz.questions,
      },
      {
        onSuccess: (res) => {
          // ✅ LUÔN SET KẾT QUẢ LẦN SUBMIT HIỆN TẠI
          setSubmitResult({
            percentage: res.percentage,
            is_passed: res.is_passed,
          });

          setShowCorrect(false);

          // ✅ CHỈ ĐÓNG MODAL KHI LẦN NÀY PASS
          if (res.is_passed) {
            setTimeout(() => {
              onClose();
            }, 1200);
          }
        },
      }
    );
  };

  return (
    <Modal
      open
      width={800}
      footer={false}
      onCancel={onClose}
      title={quiz.title}
    >
      {/* ======================
            RESULT ALERT
      ====================== */}
      {submitResult && (
        <Alert
          showIcon
          className="mb-4"
          type={submitResult.is_passed ? "success" : "error"}
          message={
            submitResult.is_passed
              ? `🎉 PASS – ${submitResult.percentage}%`
              : `❌ FAIL – ${submitResult.percentage}% (cần ${quiz.passing_percentage}%)`
          }
        />
      )}

      {/* ======================
            QUESTIONS
      ====================== */}
      {quiz.questions.map((q: SectionQuizQuestion, idx: number) => (
        <div key={q.id} className="mb-4 border p-3 rounded">
          <strong>
            {idx + 1}. {q.question}
          </strong>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {q.options.map((opt, i) => {
              const selected = answers[q.id]?.includes(opt.id);

              const correctStyle =
                showCorrect && opt.is_correct
                  ? "border-green-500 bg-green-50"
                  : "";

              return (
                <div
                  key={opt.id}
                  onClick={() => toggleSelect(q.id, opt.id)}
                  className={`p-2 border rounded cursor-pointer
                    ${selected ? "border-blue-500 bg-blue-50" : ""}
                    ${correctStyle}`}
                >
                  <strong>{String.fromCharCode(65 + i)}.</strong> {opt.text}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Divider />

      {/* ======================
            ACTION BUTTONS
      ====================== */}
      <div className="flex gap-2">
        {/* 👁️ HIỂN THỊ ĐÁP ÁN */}
        {submitResult && (
          <Button onClick={() => setShowCorrect((p) => !p)}>
            {showCorrect ? "Ẩn đáp án" : "Hiển thị đáp án"}
          </Button>
        )}

        {/* 🔁 FAIL → LÀM LẠI (KHÔNG ĐÓNG MODAL) */}
        {submitResult && !submitResult.is_passed && (
          <Button
            onClick={() => {
              setAnswers({});
              setSubmitResult(null);
              setShowCorrect(false);
            }}
          >
            Làm lại
          </Button>
        )}

        <Button
          type="primary"
          block
          loading={submitMutation.isPending}
          disabled={
            Object.keys(answers).length !== quiz.questions.length ||
            Object.values(answers).some((a) => a.length === 0)
          }
          onClick={handleSubmit}
        >
          Submit Quiz
        </Button>
      </div>
    </Modal>
  );
}
