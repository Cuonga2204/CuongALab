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

  return (
    <>
      {quizzes.map((q, index) => {
        const result = quizResult.find((rs) => rs.section_quiz_id === q.id);

        const isFirstQuiz = index === 0;

        const prevQuiz = quizzes[index - 1];

        const passedPrev =
          isFirstQuiz ||
          (prevQuiz &&
            quizResult.some(
              (r: SectionQuizResult) =>
                r.section_quiz_id === prevQuiz.id && r.is_passed
            ));

        const canDoQuiz = passedPrev;

        let statusNode = <Tag color="blue">Not Taken</Tag>;

        if (result) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          statusNode = result.is_passed ? (
            <Tag color="green">Passed</Tag>
          ) : (
            <Tag color="red">Failed</Tag>
          );
        }

        return (
          <div className="mt-4">
            <Tooltip
              key={q.id}
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
                  borderColor: result?.is_passed ? "#52c41a" : undefined,
                  padding: 0,
                }}
                bodyStyle={{ padding: "10px" }}
                onClick={() => openQuiz(q, canDoQuiz)}
              >
                <Space className="flex justify-between w-full">
                  <strong>{`${index + 1}. ${q.title}`}</strong>

                  {/* HIỂN THỊ PROGRESS THAY TAG */}
                  {result ? (
                    <Progress
                      type="circle"
                      percent={result.percentage}
                      width={30}
                      strokeColor={result.is_passed ? "#52c41a" : "#ff4d4f"}
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
          onClose={() => setCurrentQuiz(null)}
          userId={String(user?.id)}
        />
      )}
    </>
  );
}
