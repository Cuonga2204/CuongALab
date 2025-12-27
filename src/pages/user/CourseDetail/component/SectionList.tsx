import { Collapse, Empty, Spin } from "antd";
import { useGetSectionsByCourse } from "src/pages/admin/hooks/course/useSection.hooks";
import LectureList from "src/pages/user/CourseDetail/component/LectureList";
import type { Section } from "src/types/section.type";

const { Panel } = Collapse;

interface SectionListProps {
  courseId: string;
  isEnrolled: boolean;
}

export default function SectionList({
  courseId,
  isEnrolled,
}: SectionListProps) {
  const { data: sections = [], isLoading } = useGetSectionsByCourse(courseId);
  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spin />
      </div>
    );

  if (!sections.length)
    return (
      <div className="p-6 bg-white rounded-md shadow-md text-center">
        <Empty description="No sections available" />
      </div>
    );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-primary">Lộ trình khóa học</h2>

      <Collapse accordion defaultActiveKey={[sections[0].id]}>
        {sections.map((section: Section, index: number) => {
          // Nếu chưa ghi danh thì chỉ section đầu tiên có thể học
          const letter = String.fromCharCode(65 + index);
          return (
            <Panel
              key={section.id}
              header={
                <div className="flex justify-between items-center">
                  <span>
                    {letter} .{section.title}
                    {/* ({section.total_lectures} bài •{" "}
                    {section.total_duration} phút) */}
                  </span>
                </div>
              }
            >
              <LectureList
                sectionId={section.id}
                isLectureLocked={!isEnrolled}
                freeLimit={index === 0 ? 2 : 0} // ⭐ CHỈ SECTION ĐẦU ĐƯỢC 2 VIDEO FREE
              />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}
