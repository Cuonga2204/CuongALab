import axiosClient from "src/api/axiosClient";
import { SectionEndpointsEnum } from "src/pages/admin/constants/section.endpoints";
import type { Section } from "src/types/section.type";

/** === CREATE SECTION === */
export const createSection = async (data: Partial<Section>) => {
  const response = await axiosClient.post(
    SectionEndpointsEnum.CREATE_SECTION,
    data
  );
  return response.data.data;
};

/** === GET ALL SECTIONS BY COURSE === */
export const getSectionsByCourse = async (courseId: string) => {
  const response = await axiosClient.get(
    SectionEndpointsEnum.GET_ALL_BY_COURSE.replace(":courseId", courseId)
  );
  return response.data.data;
};

/** === UPDATE SECTION === */
export const updateSection = async (id: string, data: Partial<Section>) => {
  const response = await axiosClient.put(
    SectionEndpointsEnum.UPDATE_SECTION.replace(":id", id),
    data
  );
  return response.data.data;
};

export const reorderSections = async (body: {
  courseId: string;
  newOrder: { id: string; order: number }[];
}) => {
  const response = await axiosClient.put(
    SectionEndpointsEnum.REORDER_SECTIONS, // 🆕 endpoint mới
    body
  );
  return response.data.data;
};

/** === DELETE SECTION === */
export const deleteSection = async (id: string) => {
  const response = await axiosClient.delete(
    SectionEndpointsEnum.DELETE_SECTION.replace(":id", id)
  );
  return response.data.data;
};
