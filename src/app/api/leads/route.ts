import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LeadSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required.").max(80),
  lastName: z.string().trim().min(1, "Last name is required.").max(80),
  email: z.string().trim().email("Enter a valid work email.").max(160),
  company: z.string().trim().min(1, "Company is required.").max(160),
  locations: z.coerce.number().int().positive().max(100_000).optional(),
  message: z.string().trim().max(2000).optional(),
  // Honeypot: bots fill hidden fields, humans leave them empty.
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed request body." },
      { status: 400 }
    );
  }

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: first?.message ?? "Invalid submission.",
        issues: parsed.error.flatten(),
      },
      { status: 422 }
    );
  }

  const { website, locations, ...data } = parsed.data;
  if (website) {
    // Silently accept so the bot does not learn it was filtered.
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        ...data,
        locations: locations ?? null,
        userAgent: request.headers.get("user-agent")?.slice(0, 400) ?? null,
      },
      select: { id: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("[leads] create failed", error);
    return NextResponse.json(
      { error: "We couldn't save that request. Please try again." },
      { status: 500 }
    );
  }
}
