import axiosClient from "src/api/axiosClient";
import { LectureProgressEndpointsEnum } from "src/pages/user/Lecture/constants/lecture-progress.endpoints";
import type { LectureProgressUpdatePayLoad } from "src/pages/user/Lecture/types/lecture-progress.types";

export const updateLectureProgress = async (
  data: LectureProgressUpdatePayLoad
) => {
  const res = await axiosClient.post(LectureProgressEndpointsEnum.UPDATE, data);
  return res.data.data;
};

export const getLectureProgress = async (lectureId: string, userId: string) => {
  const res = await axiosClient.get(
    LectureProgressEndpointsEnum.GET_LECTURE_PROGRESS.replace(
      ":lectureId",
      lectureId
    ).replace(":userId", userId)
  );
  return res.data.data;
};
