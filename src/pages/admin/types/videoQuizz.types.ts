/** === Video Quiz Option === */
export interface VideoQuizOption {
  text: string; // Nội dung đáp án
  is_correct: boolean; // Đáp án đúng / sai
  id: string;
}

/** === Video Quiz (câu hỏi trắc nghiệm trong video) === */
export interface VideoQuiz {
  id: string; // ID quiz (MongoDB ObjectId)
  lecture_id: string; // ID của lecture chứa quiz
  time_in_seconds: number; // Thời điểm xuất hiện trong video
  question: string; // Câu hỏi
  options: VideoQuizOption[]; // Danh sách 4 đáp án
  createdAt?: string;
  updatedAt?: string;
}

/** === Request body khi tạo quiz === */
export interface CreateVideoQuizRequest {
  lecture_id: string;
  time_in_seconds: number;
  question: string;
  options: VideoQuizOption[];
}
