'use client';

import { useEffect, useState } from "react";
import { GenerationJob } from "@/lib/types";
import { useGenerationStore } from "@/store /useGenerationStore";

export const useGenerationHydration = () => {
  const hydrate = useGenerationStore((state) => state.hydrate);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const response = await fetch("/api/generations");
        const data = ((await response.json()) ?? []) as GenerationJob[]
        console.log(data, 'data data')
        if (isMounted) hydrate(data);
      } catch (error) {
        console.error("Failed to fetch generations", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [hydrate]);

  return loading;
};

