import { GenerationStatus } from "./types";

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
  // File-Examples - small sample MP3
  "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3",
  // University of Illinois demo audio
  "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.mp3",
  // Wikimedia Commons example OGG (public domain/demo)
  "https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg",
];
