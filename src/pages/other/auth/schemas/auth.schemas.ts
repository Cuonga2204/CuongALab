import { ValidationMessageEnum } from "src/constants/validation-message";
import { EmailSchema, PasswordSchema } from "src/schemas/common.schemas";
import { z } from "zod";

// Login schema
export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

// Signup schema
export const SignupSchema = z
  .object({
    email: EmailSchema,
    name: z.string().max(25),
    password: PasswordSchema,
    confirmPassword: z.string().min(1, ValidationMessageEnum["AUTH-0001"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: ValidationMessageEnum["AUTH-0004"],
  });
