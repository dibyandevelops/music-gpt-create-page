'use client'
import { motion } from "framer-motion";
import * as React from 'react';
import { useState } from "react"
import { DURATION_OPTIONS, GENRE_OPTIONS, INSTRUMENT_OPTIONS, MOOD_OPTIONS } from "@/lib/constants"
import { GenerationJob, GenerationStatus } from "@/lib/types";
import { formatTimestamp } from "@/lib/utils";
import { useGenerationStore } from "@/store /useGenerationStore";
import { cn } from "./StatusPill/cn";
import StatusPill from "./StatusPill/StatusPill";

const defaultFormState = {
  prompt: "",
  style: GENRE_OPTIONS[0],
  mood: MOOD_OPTIONS[0],
  duration: DURATION_OPTIONS[2],
  instrumentation: INSTRUMENT_OPTIONS[0],
};
type FormState = typeof defaultFormState;
const statusAccent: Record<GenerationStatus, string> = {
  pending: "from-blue-500/60 to-indigo-400/20",
  generating: "from-amber-400/60 to-rose-400/20",
  completed: "from-emerald-400/70 to-cyan-400/20",
  failed: "from-red-500/70 to-orange-400/20",
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ICreateInterfaceProps {}
const CreateInterface: React.FunctionComponent<ICreateInterfaceProps> = (props) => {
  const { error, form, submitting, setForm, handleSubmit, items: generatedItems } = useGenerationForm()
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <BackgroundAura />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:px-12">
        <PageHeader />

        <section className="grid gap-8 lg:grid-cols-[1.2fr,0.9fr]">
          <motion.div layout className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <GenerationForm
              form={form}
              error={error}
              submitting={submitting}
              setForm={setForm}
              onSubmit={handleSubmit}
            />
          </motion.div>
           <motion.div
            layout
            className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_0_60px_rgba(96,165,250,0.15)]"
          >
            <GenerationQueue items={generatedItems} />
          </motion.div>
        </section>
      </div>
    </div>
  )
};
export default CreateInterface;
const useGenerationForm = () => {
  const [form, setForm] = useState(defaultFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { upsert, items } = useGenerationStore((state) => state)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.prompt.trim()) {
      setError("Describe the sound you want to generate.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed request");
      }

      const job = (await response.json()) as GenerationJob;
      upsert(job);
      setForm((prev) => ({ ...prev, prompt: "" }));
    } catch {
      setError("We could not queue that request. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };


  return {
    form,
    setForm,
    submitting,
    setSubmitting,
    error,
    setError,
    handleSubmit,
    items
  }
}
const BackgroundAura = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#040617_45%)]" />
    <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-sky-500/30 blur-[120px]" />
    <div className="pointer-events-none absolute right-0 top-64 h-72 w-72 rounded-full bg-purple-500/30 blur-[120px]" />
  </>
);

const PageHeader = () => (
  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <p className="text-sm font-semibold tracking-[0.5em] text-sky-300 uppercase">MusicGPT Studio</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Create broadcast-ready music
      </h1>
    </div>
  </div>
)

const GenerationForm = ({
  form,
  error,
  submitting,
  setForm,
  onSubmit,
}: {
  form: FormState;
  error: string | null;
  submitting: boolean;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const setField =
    (field: keyof FormState) =>
    (value: string) =>
      setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <label className="block space-y-2">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
          Creative Direction
        </div>
        <textarea
          rows={4}
          value={form.prompt}
          onChange={(event) => setField("prompt")(event.target.value)}
          placeholder="E.g. Neon drenched club drop with cyberpunk strings and air-raid risers..."
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-base text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
        />
      </label>
      {error && (
        <p className="rounded-xl bg-rose-500/15 px-4 py-2 text-sm text-rose-200">
          {error}
        </p>
      )}

      <motion.button
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-sky-500 via-indigo-500 to-purple-500 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Queuing Request..." : "Render with MusicGPT"}
        <span className="text-white/70">↗</span>
      </motion.button>
    </form>
  );
};
const GenerationQueue = ({ items }: { items: GenerationJob[] }) => {
  const ordered = React.useMemo(
    () =>
      [...items].sort((a, b) => {
        const priority = ["pending", "generating", "completed", "failed"];
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
