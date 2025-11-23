import { GenerationStatus } from "./types";
import { randomFrom } from "./utils";

export const GENRE_OPTIONS = [
  "Hyperpop Pulse",
  "Indie Daydream",
  "Cinematic Drift",
  "Deep Focus Electronica",
  "Afrobeat Sunrise",
  "Classic Synthwave",
];

export const MOOD_OPTIONS = [
  "Ethereal",
  "Triumphant",
  "Melancholic",
  "Uplifting",
  "Nocturnal",
  "Playful",
];

export const generationStatus = ["pending", "generating", "completed", "failed"]

export const DURATION_OPTIONS = ["30 sec", "45 sec", "60 sec", "90 sec"];

export const INSTRUMENT_OPTIONS = [
  "Analog Synth Stack",
  "String Ensemble",
  "Piano + Choir",
  "Hybrid Brass",
  "Percussive Pulse",
];


export const SOCKET_PORT = Number(process.env.SOCKET_PORT ?? 4000);
export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000";


export const STEPS: Array<{ delay: number; status: GenerationStatus; progress: number }> =
  [
    { delay: 800, status: "pending", progress: 15 },
    { delay: 2200, status: "generating", progress: 46 },
    { delay: 4000, status: "generating", progress: 78 },
    { delay: 5600, status: "completed", progress: 100 },
  ];

export const SAMPLE_URLS = [
  // SoundHelix - freely available example tracks
  "https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  // SoundHelix - freely available example tracks
  "https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  // SoundHelix - freely available example tracks
  "https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  // SoundHelix - freely available example tracks
  "https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  // SoundHelix - freely available example tracks
  "https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
];

export const defaultFormState = {
  prompt: "",
  style: randomFrom(GENRE_OPTIONS),
  mood: randomFrom(MOOD_OPTIONS),
  duration: randomFrom(DURATION_OPTIONS),
  instrumentation: randomFrom(INSTRUMENT_OPTIONS),
}

export const statusAccent: Record<GenerationStatus, string> = {
  pending: "from-blue-500/60 to-indigo-400/20",
  generating: "from-amber-400/60 to-rose-400/20",
  completed: "from-emerald-400/70 to-cyan-400/20",
  failed: "from-red-500/70 to-orange-400/20",
}
