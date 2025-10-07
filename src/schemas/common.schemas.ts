import { ValidationMessageEnum } from "src/constants/validation-message";
import { EMAIL_REGEX, PASSWORD_REGEX } from "src/helpers/regex.helpers";
import z from "zod";

export const EmailSchema = z
  .string()
  .trim()
  .min(1, ValidationMessageEnum["AUTH-0001"])
  .regex(EMAIL_REGEX, ValidationMessageEnum["AUTH-0002"]);

export const PasswordSchema = z
  .string()
  .trim()
  .min(1, ValidationMessageEnum["AUTH-0001"])
  .regex(PASSWORD_REGEX, ValidationMessageEnum["AUTH-0003"]);
