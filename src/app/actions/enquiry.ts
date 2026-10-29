"use server";

import { enquiryServices } from "@/content/site";
import { readEnquiry, validateEnquiry, type EnquiryResult } from "@/lib/enquiry";

/**
 * Delivers a homepage enquiry to the clinic.
 *
 * Delivery target is configured on the server only (never exposed to the browser):
 *   ENQUIRY_WEBHOOK_URL    HTTPS endpoint that accepts a JSON POST (e.g. Formspree,
 *                          Make/Zapier webhook, or the clinic's CRM/email service)
 *   ENQUIRY_WEBHOOK_TOKEN  optional; sent as `Authorization: Bearer <token>`
 *
 * Returns "success" only when the endpoint responds with a 2xx status.
 */
export async function submitEnquiry(formData: FormData): Promise<EnquiryResult> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("company") ?? "") !== "") return { status: "invalid", errors: {} };

  const enquiry = readEnquiry(formData);
  const errors = validateEnquiry(enquiry, enquiryServices);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return { status: "unavailable" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({ ...enquiry, source: "tdc-dental-homepage", submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[enquiry] delivery failed with HTTP ${res.status}`);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[enquiry] delivery failed:", err instanceof Error ? err.name : "unknown error");
    return { status: "error" };
  }
}
