import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "src/pages/other/auth/apis/auth.api";
import { authHelpers } from "src/helpers/auth.helpers";
import {
  SuccessMessageEnum,
  ValidationMessageEnum,
} from "src/constants/validation-message";
import { LandingPagePathsEnum } from "src/pages/user/LandingPage/constants/LandingPage.path";
import type { LoginRequest } from "src/pages/other/auth/types/auth.types";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (res) => {
      authHelpers.setAuth({ token: res.accessToken, user: res.user });
      toast.success(SuccessMessageEnum["AUTH-001"]);
      navigate(LandingPagePathsEnum.LANDING_PAGE);
    },
    onError: () => {
      toast.error(ValidationMessageEnum["AUTH-0005"]);
    },
  });
};
