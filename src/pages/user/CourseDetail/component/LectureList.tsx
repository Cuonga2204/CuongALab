import { Tooltip, Progress } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { Loader } from "src/components/commons/Loader/Loader";

import { useGetLecturesBySection } from "src/pages/admin/hooks/course/useLecture.hook";
import { useGetProgressBySection } from "src/pages/user/Lecture/hooks/useLectureProgress.hook";

import { LecturePathsEnum } from "src/pages/user/Lecture/constants/lecture.paths";

import type { Lecture } from "src/types/lecture.type";
import type { LectureProgressItem } from "src/pages/user/Lecture/types/lecture-progress.types";

import { useAuthStore } from "src/store/authStore";

interface LectureListProps {
  sectionId: string;
  isLectureLocked?: boolean;
  freeLimit?: number;
}

export default function LectureList({
  sectionId,
  isLectureLocked = false,
  freeLimit = 0,
}: LectureListProps) {
  const navigate = useNavigate();
  const { id: courseId } = useParams();
  const { user } = useAuthStore();

  const { data: lectures, isLoading } = useGetLecturesBySection(sectionId);
  const { data: progressList } = useGetProgressBySection(
    sectionId,
    String(user?.id)
  );

  if (isLoading) return <Loader />;
  if (!lectures?.length) return <DisplayLoadApi />;

  const progressMap: Record<string, number> = {};
  progressList?.forEach((p: LectureProgressItem) => {
    progressMap[p.lecture_id] = p.percentage;
  });

  return (
    <div>
      {lectures.map((lecture: Lecture, index: number) => {
        const percentage = progressMap[lecture.id] ?? 0;

        // ⭐ ONLY first section has 2 free → other sections freeLimit = 0
        const locked = isLectureLocked && index >= freeLimit;

        return (
          <Tooltip
            title={locked ? "Bạn cần đăng ký để học phần này" : ""}
            key={lecture.id}
          >
            <div
              onClick={() => {
                if (!locked) {
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
                  locked
                    ? "cursor-not-allowed opacity-60 bg-gray-100"
                    : "cursor-pointer hover:bg-blue-50"
                }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-[#00ADEF] flex items-center gap-2">
                  {index + 1}. ▶ {lecture.lecture_title}
                </h4>

                <Progress
                  type="circle"
                  percent={percentage}
                  size={36}
                  strokeColor="#00ADEF"
                />
              </div>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}
