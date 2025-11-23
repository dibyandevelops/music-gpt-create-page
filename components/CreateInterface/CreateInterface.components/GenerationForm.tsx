import { motion } from "framer-motion";
import { FormState } from "@/lib/types";

export const GenerationForm = ({
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
          placeholder="E.g. Lo-Fi Instrumental song"
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
