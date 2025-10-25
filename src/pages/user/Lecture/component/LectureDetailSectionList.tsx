import { Collapse } from "antd";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { Loader } from "src/components/commons/Loader/Loader";
import { useGetSectionsByCourse } from "src/pages/admin/hooks/course/useSection.hooks";
import LectureList from "src/pages/user/CourseDetail/component/LectureList";
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
        {sections.map((section: Section) => (
          <Panel
            key={section.id}
            header={`${section.title} (${section.total_lectures} section • ${section.total_duration} minute)`}
          >
            <LectureList sectionId={section.id} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
