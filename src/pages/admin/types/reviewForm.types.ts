/* ===== ADMIN / USER SHARED TYPES ===== */

export interface ReviewQuestion {
  id?: string;
  label: string;
  options: string[];
}

/* ===== DRAFT TYPE (FORM ADD / EDIT) ===== */
export interface ReviewQuestionDraft {
  label: string;
  options: string[];
}

/* ===== ADMIN FORM RESPONSE ===== */
export interface ReviewFormResponse {
  questions: ReviewQuestion[];
  is_active: boolean;
}

/* ===== USER SUBMIT ===== */

export interface ReviewAnswerSubmit {
  question_id: string; // 🔑 map với ReviewQuestion.id
  value: string;
}

export interface SubmitCourseReviewPayload {
  rating: number;
  satisfaction: boolean;
  comment: string;
  answers: ReviewAnswerSubmit[];
}

export interface SubmitCourseReviewRequest {
  courseId: string;
  userId: string;
  payload: SubmitCourseReviewPayload;
}

export interface CourseReviewListResponse {
  data: CourseReviewItem[];
  total: number;
}

export interface ReviewAnswerView {
  question_id: string;
  question_label: string;
  value: string;
}

export interface CourseReviewItem {
  id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  course: {
    _id: string;
    title: string;
  };
  rating: number;
  satisfaction: boolean;
  comment: string;
  createdAt: string;
  answers: ReviewAnswerView[];
}
