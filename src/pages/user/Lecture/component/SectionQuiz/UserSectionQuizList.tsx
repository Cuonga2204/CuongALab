import { Card, Tag, Space, Tooltip, Progress } from "antd";
import { useState } from "react";
import {
  useGetQuizBySection,
  useGetUserQuizResult,
} from "src/pages/admin/hooks/course/useSectionQuiz.hooks";
import type {
  SectionQuiz,
  SectionQuizResult,
} from "src/pages/admin/types/section-quiz.types";
import QuizDoModal from "./QuizDoModal";
import { useAuthStore } from "src/store/authStore";

interface UserSectionQuizListProps {
  sectionId: string;
  courseId: string;
}

export default function UserSectionQuizList({
  sectionId,
  courseId,
}: UserSectionQuizListProps) {
  const { user } = useAuthStore();

  const { data: quizzes = [] } = useGetQuizBySection(sectionId);
  const { data: quizResult = [] } = useGetUserQuizResult(
    user?.id || "",
    sectionId
  );

  const [currentQuiz, setCurrentQuiz] = useState<SectionQuiz | null>(null);

  const openQuiz = (quiz: SectionQuiz, canDo: boolean) => {
    if (!canDo) return;
    setCurrentQuiz(quiz);
  };

  /** ✅ LẤY KẾT QUẢ TỐT NHẤT */
  const getBestResult = (
    results: SectionQuizResult[],
    quizId: string
  ): SectionQuizResult | undefined => {
    const list = results.filter((r) => r.section_quiz_id === quizId);
    if (!list.length) return undefined;
    return list.reduce((best, cur) =>
      cur.percentage > best.percentage ? cur : best
    );
  };

  return (
    <>
      {quizzes.map((q, index) => {
        const bestResult = getBestResult(quizResult, q.id);

        const isFirstQuiz = index === 0;
        const prevQuiz = quizzes[index - 1];
        const prevBest = prevQuiz
          ? getBestResult(quizResult, prevQuiz.id)
          : null;

        const canDoQuiz = isFirstQuiz || prevBest?.is_passed;

        return (
          <div className="mt-4" key={q.id}>
            <Tooltip
              title={
                !canDoQuiz
                  ? "Bạn cần hoàn thành quiz trước đó trước khi làm quiz này"
                  : ""
              }
            >
              <Card
                style={{
                  margin: 8,
                  cursor: canDoQuiz ? "pointer" : "not-allowed",
                  opacity: canDoQuiz ? 1 : 0.5,
                  borderColor: bestResult?.is_passed ? "#52c41a" : undefined,
                }}
                bodyStyle={{ padding: "10px" }}
                onClick={() => openQuiz(q, !!canDoQuiz)}
              >
                <Space className="flex justify-between w-full">
                  <strong>{`${index + 1}. ${q.title}`}</strong>

                  {bestResult ? (
                    <Progress
                      type="circle"
                      percent={bestResult.percentage}
                      width={30}
                      strokeColor={bestResult.is_passed ? "#52c41a" : "#ff4d4f"}
                    />
                  ) : (
                    <Tag color="blue">Not Taken</Tag>
                  )}
                </Space>
              </Card>
            </Tooltip>
          </div>
        );
      })}

      {currentQuiz && (
        <QuizDoModal
          quiz={currentQuiz}
          courseId={courseId}
          sectionId={sectionId}
          userId={String(user?.id)}
          onClose={() => setCurrentQuiz(null)}
        />
      )}
    </>
  );
}
