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

  /* ================= STATE ================= */
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [submitResult, setSubmitResult] = useState<{
    percentage: number;
    is_passed: boolean;
  } | null>(null);

  const [showCorrect, setShowCorrect] = useState(false);
  const [reviewMode, setReviewMode] = useState(false); // ⭐ NEW

  const currentQuestion: SectionQuizQuestion = quiz.questions[currentIndex];

  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const currentAnswers = answers[currentQuestion.id] || [];

  /* ================= SELECT OPTION ================= */
  const toggleSelect = (questionId: string, optionId: string) => {
    if (reviewMode) return; // ❌ KHÔNG cho sửa khi review

    setAnswers((prev) => {
      const current = prev[questionId] || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];

      return { ...prev, [questionId]: updated };
    });
  };

  /* ================= NEXT QUESTION ================= */
  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  /* ================= SUBMIT QUIZ ================= */
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
          setSubmitResult({
            percentage: res.percentage,
            is_passed: res.is_passed,
          });

          setShowCorrect(true);

          if (!res.is_passed) {
            // 🔴 FAIL → bật review mode
            setReviewMode(true);
          } else {
            // 🟢 PASS → đóng modal
            setTimeout(() => onClose(), 1200);
          }
        },
      }
    );
  };

  /* ================= RESET QUIZ ================= */
  const resetQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSubmitResult(null);
    setShowCorrect(false);
    setReviewMode(false);
  };

  /* ================= RENDER ================= */
  return (
    <Modal
      open
      width={800}
      footer={false}
      onCancel={onClose}
      title={`${quiz.title} (${currentIndex + 1}/${quiz.questions.length})`}
    >
      {/* ===== RESULT ===== */}
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

      {/* ===== QUESTION ===== */}
      <div className="mb-4 border p-4 rounded">
        <strong>
          {currentIndex + 1}. {currentQuestion.question}
        </strong>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {currentQuestion.options.map((opt, i) => {
            const isSelected = currentAnswers.includes(opt.id);

            const correctStyle =
              showCorrect && opt.is_correct
                ? "border-green-500 bg-green-50"
                : showCorrect && isSelected
                ? "border-red-500 bg-red-50"
                : "";

            return (
              <div
                key={opt.id}
                onClick={() => toggleSelect(currentQuestion.id, opt.id)}
                className={`p-3 border rounded cursor-pointer transition
                  ${isSelected ? "border-blue-500 bg-blue-50" : ""}
                  ${correctStyle}`}
              >
                <strong>{String.fromCharCode(65 + i)}.</strong> {opt.text}
              </div>
            );
          })}
        </div>
      </div>

      <Divider />

      {/* ===== ACTION BUTTONS ===== */}
      <div className="flex gap-2 flex-wrap">
        {/* REVIEW NAVIGATION */}
        {reviewMode && (
          <>
            <Button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              ← Câu trước
            </Button>

            <Button
              disabled={currentIndex === quiz.questions.length - 1}
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Câu tiếp →
            </Button>
          </>
        )}

        {/* TOGGLE ANSWER */}
        {submitResult && (
          <Button onClick={() => setShowCorrect((p) => !p)}>
            {showCorrect ? "Ẩn đáp án" : "Hiển thị đáp án"}
          </Button>
        )}

        {/* RESET */}
        {submitResult && !submitResult.is_passed && (
          <Button onClick={resetQuiz}>Làm lại</Button>
        )}

        {/* NEXT / SUBMIT */}
        {!reviewMode && !isLastQuestion && (
          <Button
            type="primary"
            disabled={currentAnswers.length === 0}
            onClick={handleNext}
          >
            Câu tiếp theo →
          </Button>
        )}

        {!reviewMode && isLastQuestion && (
          <Button
            type="primary"
            block
            loading={submitMutation.isPending}
            disabled={Object.keys(answers).length !== quiz.questions.length}
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>
        )}
      </div>
    </Modal>
  );
}
