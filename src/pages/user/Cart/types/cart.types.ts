import type { Course } from "src/types/course.type";

export interface Cart {
  id: string;
  items: Course[];
  totalQuantity: number;
  totalPrice: number;
}
