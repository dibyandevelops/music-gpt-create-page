'use client';

import { create } from "zustand";
import { GenerationJob } from "@/lib/types";
import { sortByNewest } from "@/lib/utils";

type GenerationStore = {
  items: GenerationJob[];
  isHydrated: boolean;
  hydrate: (jobs: GenerationJob[]) => void;
  upsert: (job: GenerationJob) => void;
  getByStatus: (status: GenerationJob["status"]) => GenerationJob[];
};

export const useGenerationStore = create<GenerationStore>((set, get) => ({
  items: [],
  isHydrated: false,
  hydrate: (jobs) =>
    set({
      items: sortByNewest(jobs),
      isHydrated: true,
    }),
  upsert: (job) =>
    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.id === job.id);
      if (existingIndex === -1) {
        return { items: sortByNewest([...state.items, job]) };
      }

      const nextItems = [...state.items];
      nextItems[existingIndex] = job;
      return { items: sortByNewest(nextItems) };
    }),
  getByStatus: (status) => get().items.filter((item) => item.status === status),
}));

