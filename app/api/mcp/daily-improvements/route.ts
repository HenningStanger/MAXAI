import {
  buildImprovementSnapshot,
  snapshotToMarkdown
} from "@/lib/mcp/continuous-improvement";
import { NextResponse } from "next/server";

function isAuthorized(request: Request) {
  const secret = process.env.MCP_CRON_SECRET;
  if (!secret) {
    return true;
  }
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await buildImprovementSnapshot();
  const markdown = snapshotToMarkdown(snapshot);

  return NextResponse.json({
    ok: true,
    snapshot,
    markdown
  });
}
