export interface BankOption {
  id?: string;
  text: string;
  is_correct: boolean;
}

export interface BankQuestion {
  id: string;
  question: string;

  options: BankOption[];
}

export interface CourseRef {
  id: string;
  title: string;
}

export interface QuestionBank {
  id: string;
  title: string;
  description?: string;

  // QUAN TRỌNG — course_id có thể là string, object hoặc null
  course_id?: string | CourseRef | null;

  questions: BankQuestion[];
}

export interface CreateQuestionBankPayload {
  title: string;
  description?: string;
  course_id?: string | null;
}

export interface UpdateQuestionBankPayload {
  title?: string;
  description?: string;
  course_id?: string | null;
}

export interface AddBankQuestionPayload {
  formId: string;
  question: string;
  options: BankOption[];
}

export interface DeleteBankQuestionPayload {
  formId: string;
  index: number;
}
