/* eslint-disable no-var */
// TODO: Add socket server
import { Server } from "socket.io";
import { SOCKET_PORT } from "@/lib/constants";
import type { GenerationJob } from "@/lib/types";
import { sortByNewest } from "@/lib/utils";


declare global {
  var __music_socket__: Server | undefined;
  var __music_jobs__: Map<string, GenerationJob> | undefined;
}

const allowOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const jobStore: Map<string, GenerationJob> =
  globalThis.__music_jobs__ ?? new Map();

if (!globalThis.__music_jobs__) {
  globalThis.__music_jobs__ = jobStore;
}


export const writeJob = (job: GenerationJob) => {
  jobStore.set(job.id, job);
  const io = ensureSocketServer();
  io.emit("generation:update", job);
};

export const ensureSocketServer = () => {
  if (globalThis.__music_socket__) {
    return globalThis.__music_socket__;
  }

  const io = new Server(SOCKET_PORT, {
    cors: { origin: allowOrigin, credentials: false },
  });

  io.on("connection", (socket) => {
    socket.emit("generation:sync", getJobSnapshot());
  });

  globalThis.__music_socket__ = io;
  return io;
};

export const getJobSnapshot = () => sortByNewest(Array.from(jobStore.values()));
