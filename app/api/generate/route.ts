import { NextResponse } from "next/server";
import { createGenerationJob } from "@/lib/server/generation-manager";
import type { CreateGenerationPayload } from "@/lib/types";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  try {
    const payload = (await request.json()) as Partial<CreateGenerationPayload>;

    if (!payload?.prompt || typeof payload.prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt text is required." },
        { status: 400 },
      );
    }

    const job = await createGenerationJob({
      prompt: payload.prompt.slice(0, 240),
      style: payload.style ?? "",
      mood: payload.mood ?? "",
      duration: payload.duration ?? "",
      instrumentation: payload.instrumentation ?? "",
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("MusicGPT: failed to create job", error);
    return NextResponse.json(
      { error: "Unable to create generation request." },
      { status: 500 },
    );
  }
};

