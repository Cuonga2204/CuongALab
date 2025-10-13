import { COURSE_CATEGORIES } from "src/constants/course.constants";
import { z } from "zod";

export const courseRequestSchema = z.object({
  category: z.enum(COURSE_CATEGORIES),
  title: z.string(),
  avatar: z.instanceof(File).optional(),
  price_current: z.number(),
  name_teacher: z.string(),
  overview: z.string().optional(),
  description: z.string().optional(),
});

export type CourseFormData = z.infer<typeof courseRequestSchema>;
