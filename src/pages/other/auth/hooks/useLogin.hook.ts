import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "src/pages/other/auth/apis/auth.api";
import {
  SuccessMessageEnum,
  ValidationMessageEnum,
} from "src/constants/validation-message";
import { LandingPagePathsEnum } from "src/pages/user/LandingPage/constants/LandingPage.path";
import type { LoginRequest } from "src/pages/other/auth/types/auth.types";
import { useAuthStore } from "src/store/authStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: async (res) => {
      await setAuth(res.accessToken, res.user);

      toast.success(SuccessMessageEnum["AUTH-001"]);
      navigate(LandingPagePathsEnum.LANDING_PAGE);
    },
    onError: () => {
      toast.error(ValidationMessageEnum["AUTH-0005"]);
    },
  });
};
