/**
 * Enquiry form contract, shared by the client form (instant feedback) and the
 * server action (authoritative check — the action is reachable by direct POST).
 */

export const ENQUIRY_FIELDS = ["name", "email", "phone", "service", "message"] as const;
export type EnquiryField = (typeof ENQUIRY_FIELDS)[number];
export type Enquiry = Record<EnquiryField, string>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryResult =
  | { status: "success" }
  | { status: "invalid"; errors: EnquiryErrors }
  /** No delivery endpoint configured on the server. */
  | { status: "unavailable" }
  /** Endpoint configured but delivery failed. */
  | { status: "error" };

export const LIMITS = { name: 100, email: 200, phone: 30, service: 100, message: 2000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS = /^\+?[\d\s()-]+$/;

export function readEnquiry(data: FormData): Enquiry {
  const get = (k: EnquiryField) => String(data.get(k) ?? "").trim();
  return { name: get("name"), email: get("email"), phone: get("phone"), service: get("service"), message: get("message") };
}

export function validateEnquiry(e: Enquiry, services: readonly string[]): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const digits = e.phone.replace(/\D/g, "");

  if (e.name.length < 2) errors.name = "Please enter your full name.";
  else if (e.name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!e.email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(e.email) || e.email.length > LIMITS.email) errors.email = "Please enter a valid email address, like name@example.com.";

  if (!e.phone) errors.phone = "Please enter a phone number so we can reach you.";
  else if (!PHONE_CHARS.test(e.phone) || digits.length < 7 || digits.length > 15)
    errors.phone = "Please enter a valid phone number, including the country code if outside the UAE.";

  if (e.service && !services.includes(e.service)) errors.service = "Please choose a treatment from the list.";

  if (e.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  else if (e.message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return errors;
}
