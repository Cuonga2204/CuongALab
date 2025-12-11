export interface PaymentUser {
  id: string;
  name: string;
  email: string;
}

export interface PaymentCourse {
  id: string;
  title: string;
}

export interface Payment {
  id: string;
  order_id: string;
  paymentUser: PaymentUser;
  paymentCourse?: PaymentCourse | null; // single
  cart_id?: string | null; // cart
  type: "single" | "cart";
  amount: number;
  status: "success" | "failed";
  createdAt: string;
}

export interface PaymentListResponse {
  payments: Payment[];
  total: number;
  page: number;
  limit: number;
}
