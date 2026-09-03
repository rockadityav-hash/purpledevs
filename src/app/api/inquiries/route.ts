import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  projectType: z.enum(["website", "web-app", "ecommerce", "design", "other"]),
  budget: z.enum(["under-5k", "5k-10k", "10k-25k", "25k-plus", "not-sure"]),
  summary: z.string().trim().min(20).max(3000),
  privacyAccepted: z.literal("true"),
  companyFax: z.string().max(0).optional().default(""),
});

export async function POST(request: Request) {
  const parsed = inquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Check the form and try again." }, { status: 422 });
  if (parsed.data.companyFax) return NextResponse.json({ message: "This submission could not be verified." }, { status: 403 });
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL;
  if (!apiKey || !from || !to) return NextResponse.json({ message: "The project inbox is being connected. Please try again shortly." }, { status: 503 });
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: parsed.data.email, subject: `New PurpleDevs inquiry: ${parsed.data.projectType}`, text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nProject: ${parsed.data.projectType}\nBudget: ${parsed.data.budget}\n\n${parsed.data.summary}` }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);
  if (!response?.ok) return NextResponse.json({ message: "We couldn't confirm delivery. Please try again." }, { status: 502 });
  return NextResponse.json({ message: "Your inquiry was sent." }, { status: 202 });
}
