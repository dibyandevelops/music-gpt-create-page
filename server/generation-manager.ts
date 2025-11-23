import {
  STEPS,
} from "@/lib/constants";
import type {
  CreateGenerationPayload,
  GenerationJob,
} from "@/lib/types";
import { attachPreview, buildJob } from "@/lib/utils";
import { ensureSocketServer, writeJob } from "./socket-server";


export const createGenerationJob = async (
  payload: CreateGenerationPayload,
) => {
  ensureSocketServer();
  const job = buildJob(payload);
  writeJob(job);
  simulate(job.id);
  return job;
};

const simulate = (jobId: string) => {
  const failureRoll = Math.random() < 0.15;

  STEPS.forEach((step, idx) => {
    setTimeout(() => {
      const job = updateJob(jobId, {
        status: failureRoll && idx === STEPS.length - 1 ? "failed" : step.status,
        progress: failureRoll && idx === STEPS.length - 1 ? 100 : step.progress,
        updatedAt: Date.now(),
      });

      if (!job) return;

      if (!failureRoll && job.status === "completed") {
        writeJob(attachPreview(job));
        return;
      }

      writeJob(job);
    }, step.delay);
  });
};

export const updateJob = (
  jobId: string,
  next: Partial<GenerationJob>,
): GenerationJob | undefined => {
  const store = globalThis.__music_jobs__;
  if (!store) return;
  const existing = store.get(jobId);
  if (!existing) return;
  const merged = { ...existing, ...next } satisfies GenerationJob;
  store.set(jobId, merged);
  return merged;
};

