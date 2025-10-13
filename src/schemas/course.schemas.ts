import { COURSE_CATEGORIES } from "src/constants/course.constants";
import { z } from "zod";

export const courseSchema = z.object({
  category: z.enum(COURSE_CATEGORIES),
  title: z.string(),
  avatar: z.string(),
  price_current: z.number(),
  name_teacher: z.string(),
  rating_average: z.number(),
  overview: z.string().optional(),
  description: z.string().optional(),
  student_count: z.number().min(0).optional(),
  total_sections: z.number().min(0).optional(),
  total_lectures: z.number().min(0).optional(),
  total_video_duration: z.number().min(0).optional(),
});
