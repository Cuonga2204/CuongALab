import axiosClient from "src/api/axiosClient";
import { AuthEndpointsEnum } from "src/pages/other/auth/constants/auth.enpoint";
import type {
  LoginRequest,
  SignupRequest,
} from "src/pages/other/auth/types/auth.types";

export const signupUser = async ({
  email,
  name,
  password,
  confirmPassword,
}: SignupRequest) => {
  const response = await axiosClient.post(AuthEndpointsEnum.SIGNUP, {
    email,
    name,
    password,
    confirmPassword,
  });
  return response.data.data;
};

export const loginUser = async ({ email, password }: LoginRequest) => {
  const response = await axiosClient.post(AuthEndpointsEnum.LOGIN, {
    email,
    password,
  });
  return response.data.data;
};
