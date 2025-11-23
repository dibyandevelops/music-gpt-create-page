import { NextResponse } from "next/server";
import { ensureSocketServer, getJobSnapshot } from "@/lib/server/socket-server";

export const runtime = "nodejs";

export const GET = async () => {
  ensureSocketServer();
  return NextResponse.json(getJobSnapshot());
};

