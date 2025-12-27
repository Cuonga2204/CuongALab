import { z } from "zod";

export const CourseFormDataSchema = z.object({
  id: z.string(),
  category_id: z.string(),
  title: z.string(),
  avatar: z.union([z.instanceof(File), z.string()]).optional(),
  teacher_id: z.string(),
  overview: z.string().optional(),
  description: z.string().optional(),
});

export const CourseCreateFormDataSchema = z.object({
  id: z.string().optional(),
  category_id: z.string(),
  title: z.string(),
  avatar: z.union([z.instanceof(File), z.string()]).optional(),
  teacher_id: z.string(),
  overview: z.string().optional(),
  description: z.string().optional(),
});

export type CourseFormData = z.infer<typeof CourseFormDataSchema>;
export type CourseCreateFormData = z.infer<typeof CourseCreateFormDataSchema>;
