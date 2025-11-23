'use client';

import { cva } from "class-variance-authority";
import { GenerationStatus } from "@/lib/types";
import { cn } from "./cn";

const styles = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em]",
  {
    variants: {
      status: {
        pending: "bg-blue-500/10 text-blue-200",
        generating: "bg-amber-500/10 text-amber-200",
        completed: "bg-emerald-500/10 text-emerald-200",
        failed: "bg-rose-500/10 text-rose-200",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  },
);

const label: Record<GenerationStatus, string> = {
  pending: "pending",
  generating: "generating",
  completed: "completed",
  failed: "failed",
};

const StatusPill = ({ status }: { status: GenerationStatus }) => (
  <span className={cn(styles({ status }))}>{label[status]}</span>
);

export default StatusPill;

