import { randomUUID } from "crypto";
import {
  DURATION_OPTIONS,
  GENRE_OPTIONS,
  INSTRUMENT_OPTIONS,
  MOOD_OPTIONS,
  SAMPLE_URLS,
} from "@/lib/constants";
import type {
  CreateGenerationPayload,
  GenerationJob,
} from "@/lib/types";

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const sortByNewest = <T extends { createdAt: number }>(items: T[]) =>
  [...items].sort((a, b) => b.createdAt - a.createdAt);


export const KEYS = ["C Minor", "A Major", "F# Dorian", "D Lydian"];
export const EMOJIS = ["✨", "🌘", "🚀", "🌊", "💫", "🔥"];

export const randomFrom = <T>(list: readonly T[]): T =>
  list[Math.floor(Math.random() * list.length)]!

export const withFallback = (value: string, fallbackList: readonly string[]) =>
  value?.trim() || randomFrom(fallbackList);

export const buildJob = (payload: CreateGenerationPayload): GenerationJob => {
  const now = Date.now();
  return {
    id: randomUUID(),
    prompt: payload.prompt,
    mood: withFallback(payload.mood, MOOD_OPTIONS),
    style: withFallback(payload.style, GENRE_OPTIONS),
    duration: withFallback(payload.duration, DURATION_OPTIONS),
    instrumentation: withFallback(payload.instrumentation, INSTRUMENT_OPTIONS),
    status: "pending",
    createdAt: now,
    updatedAt: now,
    progress: 8,
    tempo: 110 + Math.round(Math.random() * 30),
    key: randomFrom(KEYS),
    energy: 40 + Math.round(Math.random() * 50),
    coverEmoji: randomFrom(EMOJIS),
  };
};


export const attachPreview = (job: GenerationJob): GenerationJob => ({
  ...job,
  audioUrl: randomFrom(SAMPLE_URLS),
});
