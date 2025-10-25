import axiosClientFormData from "src/api/axiosClientFormData";
import axiosClient from "src/api/axiosClient";
import { LectureEndpointsEnum } from "src/pages/admin/constants/lecture.endpoints";
import type { Lecture, LectureResponse } from "src/types/lecture.type";

/** === CREATE LECTURE === */
export const createLecture = async (data: Lecture) => {
  const response = await axiosClientFormData.post(
    LectureEndpointsEnum.CREATE_LECTURE,
    data
  );
  return response.data.data;
};

/** === GET LECTURE DETAIL === */
export const getLectureDetail = async (
  id: string
): Promise<LectureResponse> => {
  const res = await axiosClient.get(
    LectureEndpointsEnum.GET_DETAIL.replace(":id", id)
  );
  return res.data.data;
};

/** === UPDATE LECTURE === */
export const updateLecture = async (id: string, data: Lecture) => {
  const response = await axiosClientFormData.put(
    LectureEndpointsEnum.UPDATE_LECTURE.replace(":id", id),
    data
  );
  return response.data.data;
};

/** === GET BY SECTION === */
export const getLecturesBySection = async (sectionId: string) => {
  const response = await axiosClient.get(
    LectureEndpointsEnum.GET_ALL_BY_SECTION.replace(":sectionId", sectionId)
  );
  return response.data.data;
};

/** === DELETE === */
export const deleteLecture = async (id: string) => {
  const response = await axiosClient.delete(
    LectureEndpointsEnum.DELETE_LECTURE.replace(":id", id)
  );
  return response.data.data;
};
