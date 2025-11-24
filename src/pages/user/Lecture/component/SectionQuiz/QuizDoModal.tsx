import { Modal, Button, message } from "antd";
import { useState } from "react";
import { useSubmitQuiz } from "src/pages/admin/hooks/course/useSectionQuiz.hooks";
import type {
  SectionQuiz,
  SectionQuizQuestion,
  SubmitQuizPayload,
} from "src/pages/admin/types/section-quiz.types";

interface QuizDoModalProps {
  quiz: SectionQuiz;
  sectionId: string;
  courseId: string;
  onClose: () => void;
  userId: string;
}

interface AnswerMap {
  [questionId: string]: string[]; // multiple select
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
  const [showCorrect, setShowCorrect] = useState(false); // ⭐ NEW STATE

  /* ===========================
   *  TOGGLE MULTIPLE SELECT
   * =========================== */
  const toggleSelect = (questionId: string, optionId: string) => {
    if (showCorrect) return; // ⭐ Không cho chọn khi đang xem đáp án

    setAnswers((prev) => {
      const current = prev[questionId] || [];

      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];

      return { ...prev, [questionId]: updated };
    });
  };

  /* ===========================
   *  HANDLE SUBMIT
   * =========================== */
  const handleSubmit = () => {
    const payload: SubmitQuizPayload = {
      user_id: userId,
      section_quiz_id: quiz.id,
      course_id: courseId,
      section_id: sectionId,

      answers: Object.entries(answers).map(([question_id, option_ids]) => ({
        question_id,
        selected_option_ids: option_ids,
      })),
    };

    submitMutation.mutate(payload, {
      onSuccess: (result) => {
        if (result.is_passed) {
          message.success(`🎉 Passed! (${result.percentage}%)`);
        } else {
          message.error(`❌ Failed (${result.percentage}%). Hãy thử lại!`);
        }
        onClose();
      },
    });
  };

  /* ===========================
   *  RENDER
   * =========================== */
  return (
    <Modal
      width={760}
      title={
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{quiz.title}</h2>
          <span className="text-sm text-gray-600 mt-1">
            🎯 Cần đạt tối thiểu <strong>{quiz.passing_percentage}%</strong> để
            PASS
          </span>
        </div>
      }
      open
      onCancel={onClose}
      footer={false}
    >
      <div className="py-3 space-y-6">
        {quiz.questions.map((q: SectionQuizQuestion, index: number) => (
          <div
            key={q.id}
            className="p-4 border border-gray-200 rounded-xl shadow-sm bg-white"
          >
            {/* Câu hỏi */}
            <h3 className="font-semibold mb-3 text-[16px]">
              {index + 1}. {q.question}
            </h3>

            {/* Danh sách đáp án */}
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt, optIndex) => {
                const selected = answers[q.id]?.includes(opt.id!);
                const isCorrect = opt.is_correct;

                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleSelect(q.id, opt.id!)}
                    className={`
                      px-3 py-2 text-[14px] rounded-md border transition-all cursor-pointer
                      ${
                        showCorrect
                          ? isCorrect
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-300 bg-gray-50 opacity-60"
                          : selected
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    <strong>{String.fromCharCode(65 + optIndex)}.</strong>{" "}
                    {opt.text}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* ===========================
             BUTTONS
        ============================ */}
        <div className="flex gap-3">
          <Button
            type="default"
            size="large"
            block
            onClick={() => setShowCorrect(!showCorrect)}
          >
            {showCorrect ? "Ẩn đáp án" : "Hiển thị đáp án"}
          </Button>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleSubmit}
            disabled={
              showCorrect || // ⭐ Disable khi xem đáp án
              Object.keys(answers).length !== quiz.questions.length ||
              Object.values(answers).some((arr) => arr.length === 0)
            }
          >
            Submit Quiz
          </Button>
        </div>
      </div>
    </Modal>
  );
}
