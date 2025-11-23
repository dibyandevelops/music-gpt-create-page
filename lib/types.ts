export type GenerationStatus = "pending" | "generating" | "completed" | "failed";

export interface GenerationJob {
  id: string;
  prompt: string;
  mood: string;
  style: string;
  duration: string;
  instrumentation: string;
  status: GenerationStatus;
  createdAt: number;
  updatedAt: number;
  progress: number;
  tempo: number;
  key: string;
  energy: number;
  coverEmoji: string;
  audioUrl?: string;
  error?: string;
}
