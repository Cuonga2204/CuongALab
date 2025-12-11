import axiosClient from "src/api/axiosClient";
import { TeacherEndpointsEnum } from "src/pages/admin/constants/user.endpoints";
import axiosClientFormData from "src/api/axiosClientFormData";
import { UserEndpointsEnum } from "src/pages/admin/constants/user.constants";
import type {
  User,
  UserFormData,
  UserListResponse,
} from "src/pages/admin/types/user.types";
export const getTeachers = async () => {
  const response = await axiosClient.get(TeacherEndpointsEnum.GET_TEACHERS);
  return response.data.data.teachers;
};

export const getUsers = async (
  page: number,
  limit: number
): Promise<UserListResponse> => {
  const res = await axiosClient.get(UserEndpointsEnum.GET_ALL, {
    params: { page, limit },
  });
  return res.data.data;
};

export const deleteUserApi = async (id: string): Promise<User> => {
  const res = await axiosClient.delete(
    UserEndpointsEnum.DELETE_USER.replace(":id", id)
  );
  return res.data.data;
};

export const updateUserApi = async (
  id: string,
  data: UserFormData
): Promise<User> => {
  const res = await axiosClientFormData.put(
    UserEndpointsEnum.UPDATE_USER.replace(":id", id),
    data,
    {}
  );
  return res.data.data;
};
