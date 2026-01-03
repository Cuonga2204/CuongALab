export type ChatRole = "user" | "model";

export interface ChatMessageItem {
  role: ChatRole;
  text: string;
}
