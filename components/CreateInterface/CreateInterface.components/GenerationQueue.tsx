import { motion } from "framer-motion"
import React from "react";
import { cn } from "@/components/StatusPill/cn";
import StatusPill from "@/components/StatusPill/StatusPill";
import { generationStatus, statusAccent } from "@/lib/constants";
import { GenerationJob } from "@/lib/types";
import { formatTimestamp } from "@/lib/utils";

export const GenerationQueue = ({ items }: { items: GenerationJob[] }) => {
  const ordered = React.useMemo(
    () =>
      [...items].sort((a, b) => {
        const priority = generationStatus;
        return (
          priority.indexOf(a.status) - priority.indexOf(b.status) ||
          b.createdAt - a.createdAt
        );
      }),
    [items],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
          Live Queue
        </p>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
          {items.length} active
        </span>
      </div>
      <div className="space-y-4">
        {ordered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-white/60">
            Submissions appear here in real-time once queued.
          </div>
        ) : (
          ordered.map((item) => <GenerationCard key={item.id} job={item} />)
        )}
      </div>
    </div>
  );
};


const GenerationCard = ({ job }: { job: GenerationJob }) => {
  const motionProps = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: "easeOut" as const },
    layout: true,
  };

  return (
    <motion.div
      {...motionProps}
      className="rounded-2xl border border-white/10 bg-white/5 p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-2xl">
            {job.coverEmoji}
          </div>
          <div>
            <p className="font-semibold text-white">{job.style}</p>
            <p className="text-xs text-white/60">{job.mood}</p>
          </div>
        </div>
        <StatusPill status={job.status} />
      </div>
      <p className="mt-3 text-sm text-white/70 line-clamp-2">{job.prompt}</p>
      <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-white/60">
        <InfoRow label="Duration" value={job.duration} />
        <InfoRow label="Tempo" value={`${job.tempo} BPM`} />
        <InfoRow label="Key" value={job.key} />
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div
          style={{ width: `${job.progress}%` }}
          className={cn(
            "h-full rounded-full bg-linear-to-r transition-[width] duration-500",
            statusAccent[job.status],
          )}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-white/50">
        <span>{formatTimestamp(job.createdAt)}</span>
        {job.audioUrl && job.status === "completed" && (
          <audio controls className="w-32">
            <source src={job.audioUrl} type="audio/mpeg" />
          </audio>
        )}
        {job.status === "failed" && (
          <span className="text-rose-300">Regenerate</span>
        )}
      </div>
    </motion.div>
  );
};
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
      {label}
    </p>
    <p className="text-white/80">{value}</p>
  </div>
);
