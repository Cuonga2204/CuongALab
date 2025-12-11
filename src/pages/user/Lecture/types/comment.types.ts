// ===============================
// COMMENT USER TYPE
// ===============================
export interface CommentUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

// ===============================
// RAW COMMENT ITEM FROM API
// ===============================
export interface CommentItem {
  id: string;
  lecture_id: string;
  user_id: CommentUser;
  parent_id: string | null;
  content: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;

  replies: CommentItem[]; // luôn có mảng (dù rỗng)
}

// ===============================
// CREATE COMMENT / REPLY PAYLOAD
// ===============================
export interface CommentPayload {
  lectureId: string;
  userId: string; // 👈 NEW REQUIRED FIELD
  content: string;
  parentId?: string | null;
}
// ===============================
// API RESPONSE TYPE
// ===============================
export type CommentResponse = CommentItem;
