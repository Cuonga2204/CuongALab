import { Tooltip } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { Loader } from "src/components/commons/Loader/Loader";
import { useGetLecturesBySection } from "src/pages/admin/hooks/course/useLecture.hook";
import { LecturePathsEnum } from "src/pages/user/Lecture/constatns/lecture.paths";
import type { Lecture } from "src/types/lecture.type";

interface LectureListProps {
  sectionId: string;
  isLocked?: boolean;
}

export default function LectureList({ sectionId, isLocked }: LectureListProps) {
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  const { data: lectures, isLoading } = useGetLecturesBySection(sectionId);

  if (isLoading) return <Loader />;
  if (!lectures?.length) return <DisplayLoadApi />;

  return (
    <div>
      {lectures.map((lecture: Lecture) => (
        <Tooltip title={isLocked ? "Bạn cần đăng ký để học phần này" : ""}>
          <div
            key={lecture.id}
            onClick={() => {
              if (!isLocked) {
                navigate(
                  LecturePathsEnum.Lecture.replace(
                    ":courseId",
                    courseId!
                  ).replace(":lectureId", lecture.id)
                );
              }
            }}
            className={`border border-dashed border-gray-300 p-4 m-2.5 rounded-md transition 
            ${
              isLocked
                ? "cursor-not-allowed opacity-60 bg-gray-100"
                : "cursor-pointer hover:bg-blue-50"
            }`}
          >
            <h4 className="font-semibold text-[#00ADEF] flex items-center gap-2">
              ▶ {lecture.lecture_title}
              <span className="text-xs text-gray-500">
                ({lecture.duration} phút)
              </span>
            </h4>
          </div>
        </Tooltip>
      ))}
    </div>
  );
}
