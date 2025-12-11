// =======================================
// LectureDetailSectionList.tsx (CLEAN)
// =======================================

import { Collapse } from "antd";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { Loader } from "src/components/commons/Loader/Loader";
import { useGetSectionsByCourse } from "src/pages/admin/hooks/course/useSection.hooks";
import LectureList from "src/pages/user/CourseDetail/component/LectureList";
import UserSectionQuizList from "src/pages/user/Lecture/component/SectionQuiz/UserSectionQuizList";

import type { Section } from "src/types/section.type";

export default function LectureDetailSectionList({
  courseId,
  isEnrolled,
}: {
  courseId: string;
  isEnrolled: boolean;
}) {
  const { data: sections, isLoading } = useGetSectionsByCourse(courseId);

  if (isLoading) return <Loader />;
  if (!sections.length) return <DisplayLoadApi />;

  const items = sections.map((section: Section, index: number) => ({
    key: section.id,
    label: `${String.fromCharCode(65 + index)}. ${section.title}`,
    children: (
      <>
        <LectureList
          isLectureLocked={!isEnrolled}
          freeLimit={index === 0 ? 2 : 0}
          sectionId={section.id}
        />
        <UserSectionQuizList sectionId={section.id} courseId={courseId} />
      </>
    ),
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Collapse accordion items={items} />
    </div>
  );
}
