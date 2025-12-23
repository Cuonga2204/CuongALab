export interface QuizOption {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface SectionQuizQuestion {
  form_question_id?: string;
  id: string;
  section_quiz_id: string;
  question: string;
  options: QuizOption[];
}

export interface SectionQuiz {
  length: number;
  id: string;
  course_id: string;
  section_id: string;
  title: string;
  position_in_section: number;
  passing_percentage: number;
  questions: SectionQuizQuestion[];
}

export interface SectionQuizResult {
  id: string;
  user_id: string;
  course_id: string;
  section_id: string;
  section_quiz_id: string;
  correct_count: number;
  total_questions: number;
  percentage: number;
  is_passed: boolean;
  submitted_at: string;
}

/* === REQUEST TYPES === */
export interface CreateQuizPayload {
  title: string;
  section_id: string;
  course_id: string;
  passing_percentage: number;
}

export interface UpdateQuizPayload {
  title?: string;
  passing_percentage?: number;
}

export interface CreateQuizQuestionPayload {
  section_quiz_id: string;
  question: string;
  options: QuizOption[];
}

export interface SubmitQuizPayload {
  user_id: string;
  section_quiz_id: string;
  course_id: string;
  section_id: string;
  answers: {
    question_id: string;
    selected_option_ids: string[];
  }[];
  questions: SectionQuizQuestion[];
}
export interface SectionQuizResult {
  id: string;
  user_id: string;
  course_id: string;
  section_id: string;
  section_quiz_id: string;
  correct_count: number;
  total_questions: number;
  percentage: number;
  is_passed: boolean;
  submitted_at: string;
}

export type UserQuizResults = SectionQuizResult[];
