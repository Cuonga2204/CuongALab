import axiosClient from "src/api/axiosClient";
import axiosClientFormData from "src/api/axiosClientFormData";
import { CourseEndpointsEnum } from "src/pages/admin/constants/course.endpoints";
import type { CourseFormData } from "src/pages/admin/types/course.types";

export const createCourse = async (formData: CourseFormData) => {
  const response = await axiosClientFormData.post(
    CourseEndpointsEnum.CREATE_COURSE,
    formData
  );
  return response.data.data;
};

/** == GET ALL COURSES === */
export const getAllCourses = async () => {
  const response = await axiosClient.get(CourseEndpointsEnum.GET_ALL);
  return response.data.data; // { total, page, limit, courses }
};

/** === GET COURSE DETAIL === */
export const getCourseDetail = async (id: string) => {
  const response = await axiosClient.get(
    CourseEndpointsEnum.GET_DETAIL.replace(":id", id)
  );
  return response.data.data;
};

/** === UPDATE COURSE === */
export const updateCourse = async (id: string, formData: CourseFormData) => {
  const response = await axiosClientFormData.put(
    CourseEndpointsEnum.UPDATE_COURSE.replace(":id", id),
    formData
  );
  return response.data.data;
};

/** === DELETE COURSE === */
export const deleteCourse = async (id: string) => {
  const response = await axiosClient.delete(
    CourseEndpointsEnum.DELETE_COURSE.replace(":id", id)
  );
  return response.data.data;
};
