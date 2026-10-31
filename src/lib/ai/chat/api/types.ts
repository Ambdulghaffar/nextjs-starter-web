export type ChatRole = "user" | "assistant";

export interface ChatResponse {
  provider: string;
  content: string;
}
