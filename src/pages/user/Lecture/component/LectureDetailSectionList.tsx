// ===============================================
// LectureDetailSectionList.tsx (UPDATED)
// ===============================================

import { Collapse } from "antd";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { Loader } from "src/components/commons/Loader/Loader";
import { useGetSectionsByCourse } from "src/pages/admin/hooks/course/useSection.hooks";
import LectureList from "src/pages/user/CourseDetail/component/LectureList";
import UserSectionQuizList from "src/pages/user/Lecture/component/SectionQuiz/UserSectionQuizList";

import type { Section } from "src/types/section.type";

const { Panel } = Collapse;

interface LectureDetailSectionListProps {
  courseId: string;
}

export default function LectureDetailSectionList({
  courseId,
}: LectureDetailSectionListProps) {
  const { data: sections, isLoading } = useGetSectionsByCourse(courseId);

  if (isLoading) return <Loader />;
  if (!sections.length) return <DisplayLoadApi />;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Collapse accordion>
        {sections.map((section: Section, index: number) => {
          const letter = String.fromCharCode(65 + index);

          return (
            <Panel
              key={section.id}
              header={`${letter}. ${section.title}`}
              style={{ borderRadius: 8 }}
            >
              {/* === LECTURES === */}
              <LectureList sectionId={section.id} />

              {/* === QUIZ FOR THIS SECTION === */}
              <UserSectionQuizList sectionId={section.id} courseId={courseId} />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}
