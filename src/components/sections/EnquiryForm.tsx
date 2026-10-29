"use client";

import { useId, useState, useTransition, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";
import { clinic, enquiryServices } from "@/content/site";
import {
  ENQUIRY_FIELDS,
  LIMITS,
  readEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryResult,
} from "@/lib/enquiry";
import { ArrowIcon } from "@/components/ui/icons";

const inputBase =
  "block w-full rounded-2xl border bg-paper px-5 text-[0.9375rem] text-ink placeholder:text-ink/35 outline-none " +
  "transition-[border-color,box-shadow] duration-300 focus:border-ink focus:shadow-[0_0_0_4px_rgb(0_0_0/0.08)]";

export function EnquiryForm() {
  const id = useId();
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [messageLength, setMessageLength] = useState(0);
  const [pending, startTransition] = useTransition();

  type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const validateForm = (form: HTMLFormElement) => validateEnquiry(readEnquiry(new FormData(form)), enquiryServices);

  // After a field has been visited, keep its error in sync as the user types.
  const revalidate = (field: EnquiryField, form: HTMLFormElement | null) => {
    if (!form || (!touched[field] && !errors[field])) return;
    const next = validateForm(form);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const onBlur = (field: EnquiryField, e: FocusEvent<Control>) => {
    const form = e.currentTarget.form;
    if (!form) return;
    setTouched((t) => ({ ...t, [field]: true }));
    const next = validateForm(form);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const focusFirstError = (form: HTMLFormElement, errs: EnquiryErrors) => {
    const first = ENQUIRY_FIELDS.find((f) => errs[f]);
    if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    const form = e.currentTarget;
    const errs = validateForm(form);
    setErrors(errs);
    setTouched(Object.fromEntries(ENQUIRY_FIELDS.map((f) => [f, true])));
    setResult(null);
    if (Object.keys(errs).length) {
      setResult({ status: "invalid", errors: errs });
      focusFirstError(form, errs);
      return;
    }
    const data = new FormData(form);
    startTransition(async () => {
      try {
        const res = await submitEnquiry(data);
        setResult(res);
        if (res.status === "invalid") {
          setErrors(res.errors);
          focusFirstError(form, res.errors);
        } else if (res.status === "success") {
          form.reset();
          setTouched({});
          setMessageLength(0);
        }
      } catch {
        // Network failure or server unavailable: the request never reached a confirmed state.
        setResult({ status: "error" });
      }
    });
  };

  const field = (name: EnquiryField) => {
    const errorId = `${id}-${name}-error`;
    return {
      id: `${id}-${name}`,
      name,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? errorId : undefined,
      onBlur: (e: FocusEvent<Control>) => onBlur(name, e),
      onChange: (e: { currentTarget: Control }) => revalidate(name, e.currentTarget.form),
      disabled: pending,
      className: `${inputBase} ${errors[name] ? "border-ink" : "border-line hover:border-ink/40"}`,
    };
  };

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={`${id}-title`} className="flex h-full flex-col">
      <h3 id={`${id}-title`} className="font-display text-2xl font-medium tracking-[-0.02em] sm:text-[1.75rem]">
        Send us an enquiry
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Fields marked <span aria-hidden>*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="mt-8 grid gap-x-4 gap-y-6 sm:grid-cols-2">
        <Field label="Full name" required htmlFor={`${id}-name`} error={errors.name} errorId={`${id}-name-error`}>
          <input {...field("name")} type="text" autoComplete="name" required maxLength={LIMITS.name} placeholder="Your full name" />
        </Field>
        <Field label="Email address" required htmlFor={`${id}-email`} error={errors.email} errorId={`${id}-email-error`}>
          <input {...field("email")} type="email" inputMode="email" autoComplete="email" required maxLength={LIMITS.email} placeholder="name@example.com" />
        </Field>
        <Field label="Phone number" required htmlFor={`${id}-phone`} error={errors.phone} errorId={`${id}-phone-error`}>
          <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" required maxLength={LIMITS.phone} placeholder="+971 50 000 0000" />
        </Field>
        <Field label="Treatment of interest" htmlFor={`${id}-service`} error={errors.service} errorId={`${id}-service-error`}>
          <div className="relative">
            <select {...field("service")} defaultValue="" className={`${field("service").className} appearance-none pr-12`}>
              <option value="">Select a treatment (optional)</option>
              {enquiryServices.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth={1.75}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Message" required htmlFor={`${id}-message`} error={errors.message} errorId={`${id}-message-error`}>
            <textarea
              {...field("message")}
              onChange={(e) => {
                setMessageLength(e.currentTarget.value.length);
                revalidate("message", e.currentTarget.form);
              }}
              required
              rows={5}
              maxLength={LIMITS.message}
              placeholder="How can we help? Share any symptoms, questions or preferred times."
              className={`${field("message").className} min-h-36 resize-y py-4 leading-relaxed`}
            />
          </Field>
          <p aria-hidden className="mt-2 text-right text-xs tabular-nums text-muted">
            {messageLength} / {LIMITS.message}
          </p>
        </div>
      </div>

      {/* Honeypot for bots: hidden from people and assistive technology */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="mt-auto pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={pending}
            aria-disabled={pending}
            className="group/btn inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-ink px-8 text-[0.9375rem] font-medium text-paper transition-[box-shadow,opacity,scale] duration-300 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink active:scale-[0.98] disabled:cursor-progress disabled:opacity-70"
          >
            {pending ? "Sending…" : "Send Enquiry"}
            <span aria-hidden className="grid size-7 place-items-center rounded-full bg-paper/15 transition-[translate] duration-300 group-hover/btn:translate-x-0.5">
              {pending ? <span className="size-3 animate-spin rounded-full border-2 border-paper border-t-transparent" /> : <ArrowIcon className="size-3.5" />}
            </span>
          </button>
          <p className="text-xs leading-relaxed text-muted sm:max-w-[16rem] sm:text-right">
            We only use your details to respond to your enquiry.
          </p>
        </div>

        <div aria-live="polite" role="status" className="empty:hidden">
          {result?.status === "success" && (
            <Notice title="Thank you — your enquiry has been sent.">Our team will be in touch with you soon.</Notice>
          )}
        </div>
        <div aria-live="assertive" role="alert" className="empty:hidden">
          {result?.status === "unavailable" && (
            <Notice title="Online enquiries aren’t available yet.">
              Your message has not been sent. Please call us on{" "}
              <a className="font-medium underline underline-offset-4" href={clinic.phoneHref}>
                {clinic.phoneDisplay}
              </a>{" "}
              or{" "}
              <a className="font-medium underline underline-offset-4" href={clinic.whatsappHref} target="_blank" rel="noopener noreferrer">
                message us on WhatsApp
              </a>
              .
            </Notice>
          )}
          {result?.status === "error" && (
            <Notice title="Sorry, we couldn’t send your enquiry.">
              Please try again in a moment, or call us on{" "}
              <a className="font-medium underline underline-offset-4" href={clinic.phoneHref}>
                {clinic.phoneDisplay}
              </a>
              .
            </Notice>
          )}
          {result?.status === "invalid" && Object.keys(errors).length > 0 && (
            <Notice title="Please check the highlighted fields.">Some details need correcting before we can send your enquiry.</Notice>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div data-field>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <div className="[&_input]:h-14 [&_select]:h-14">{children}</div>
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-sm text-ink">
          <span aria-hidden className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-ink text-[0.625rem] font-bold text-paper">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
}

function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-ink/15 bg-paper p-5 text-sm leading-relaxed">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-muted">{children}</p>
    </div>
  );
}
