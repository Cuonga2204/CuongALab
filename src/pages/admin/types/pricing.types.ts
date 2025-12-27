// ========== COURSE BASIC INFO ==========
export interface CourseShortInfo {
  id: string;
  title: string;
  name_teacher: string;
  price_current: number;
  price_old: number;
}

// ========== PRICING DATA ==========
export interface CoursePricing {
  id: string;
  course_id: string;

  base_price: number;
  sale_price: number;

  discount_percent: number;
  discount_tag?: string;

  is_discount_active: boolean;

  sale_start?: string | null; // ❗ STRING
  sale_end?: string | null; // ❗ STRING
}

// ========== ROW FOR TABLE ==========
export interface PricingRow {
  course: CourseShortInfo;
  pricing: CoursePricing | null;
}

// ========== UPDATE PAYLOAD ==========
export interface UpdatePricingPayload {
  id?: string;
  course_id: string;

  base_price: number;
  sale_price: number;

  discount_percent: number;
  discount_tag?: string;

  is_discount_active: boolean;

  sale_start?: string | null; // ❗ STRING
  sale_end?: string | null; // ❗ STRING
}
export interface PricingPaginationResponse {
  data: PricingRow[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
