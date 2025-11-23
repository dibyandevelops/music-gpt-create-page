'use client';

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "@/lib/constants";
import { useGenerationStore } from "@/store /useGenerationStore";

export const useGenerationSocket = () => {
  const hydrate = useGenerationStore((state) => state.hydrate);
  const upsert = useGenerationStore((state) => state.upsert);

  useEffect(() => {
    let socket: Socket | undefined;

    try {
      socket = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnectionAttempts: 5,
      });

      socket.on("generation:sync", (items) => hydrate(items));
      socket.on("generation:update", (item) => upsert(item));
    } catch (error) {
      console.error("Socket connection failed", error);
    }

    return () => {
      socket?.disconnect();
    };
  }, [hydrate, upsert]);
};

