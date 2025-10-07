import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signupUser } from "src/pages/other/auth/apis/auth.api";
import {
  SuccessMessageEnum,
  ValidationMessageEnum,
} from "src/constants/validation-message";
import { LandingPagePathsEnum } from "src/pages/user/LandingPage/constants/LandingPage.path";
import type { SignupRequest } from "src/pages/other/auth/types/auth.types";
import { authHelpers } from "src/helpers/auth.helpers";

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: SignupRequest) => signupUser(data),
    onSuccess: (res) => {
      authHelpers.setAuth({ token: res.accessToken, user: res.user });
      toast.success(SuccessMessageEnum["AUTH-002"]);
      navigate(LandingPagePathsEnum.LANDING_PAGE);
    },
    onError: () => {
      toast.error(ValidationMessageEnum["AUTH-0006"]);
    },
  });
};
