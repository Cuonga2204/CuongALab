import { Collapse } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLecturesBySection } from "src/pages/admin/hooks/course/useLecture.hook";
import { LecturePathsEnum } from "src/pages/user/Lecture/constatns/lecture.paths";
import type { LectureResponse } from "src/types/lecture.type";
import type { Section } from "src/types/section.type";

const { Panel } = Collapse;

interface LectureSectionPanelProps {
  section: Section;
}

export default function LectureSectionPanel({
  section,
}: LectureSectionPanelProps) {
  const { id: courseId, lectureId } = useParams();
  const navigate = useNavigate();

  const { data: lectures } = useGetLecturesBySection(section.id);

  return (
    <Panel header={section.title} key={section.id}>
      <div className="flex flex-col gap-2">
        {lectures.map((lecture: LectureResponse) => (
          <div
            key={lecture.id}
            onClick={() =>
              navigate(
                LecturePathsEnum.Lecture.replace(
                  ":courseId",
                  courseId!
                ).replace(":lectureId", lecture.id)
              )
            }
            className={`p-2 rounded cursor-pointer text-sm hover:bg-blue-50 ${
              lecture.id === lectureId
                ? "bg-blue-100 font-semibold"
                : "bg-white"
            }`}
          >
            {lecture.lecture_title}
          </div>
        ))}
      </div>
    </Panel>
  );
}
