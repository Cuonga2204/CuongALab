import axiosClient from "src/api/axiosClient";
import { TeacherEndpointsEnum } from "src/pages/admin/constants/user.endpoints";

export const getTeachers = async () => {
  const response = await axiosClient.get(TeacherEndpointsEnum.GET_TEACHERS);
  return response.data.data.teachers;
};
