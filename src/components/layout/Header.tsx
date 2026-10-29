"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { bookingHref, clinic, nav } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon, MailIcon, PinIcon } from "@/components/ui/icons";

type NavItem = (typeof nav)[number];

/** A nav item is the current page only for route links ("/", "/our-services"), never for "/#section" links. */
function isCurrent(item: NavItem, pathname: string) {
  if ("external" in item || item.href.includes("#")) return false;
  if (item.href === "/") return pathname === "/";
  // Treatment pages (/service/…) sit under Our Services.
  return pathname.startsWith(item.href) || (item.href === "/our-services" && pathname.startsWith("/service/"));
}

/** External items open in a new tab; internal ones use client-side navigation. */
function NavLink({ item, current = false, className, onClick, children }: { item: NavItem; current?: boolean; className: string; onClick?: () => void; children: ReactNode }) {
  if ("external" in item) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={item.href} aria-current={current ? "page" : undefined} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside while open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = [toggle, ...panel.querySelectorAll<HTMLElement>("a, button")].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // On md+ the negative top lets the info strip scroll away while the nav bar stays
    // pinned; nothing changes height, so the page never shifts.
    <header className="sticky top-0 z-50 md:-top-10">
      {/* Info strip */}
      <div className="hidden bg-ink text-paper md:block">
        <div className="mx-auto flex h-10 max-w-[90rem] items-center justify-between gap-6 px-6 text-[0.8125rem] lg:px-10">
          <a href={clinic.mapsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-paper">
            <PinIcon className="size-4" />
            {clinic.address}
          </a>
          <a href={`mailto:${clinic.email}`} className="inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-paper">
            <MailIcon className="size-4" />
            {clinic.email}
          </a>
        </div>
      </div>

      <div
        className={`border-b bg-paper/90 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${
          scrolled ? "border-line shadow-[0_8px_30px_-20px_rgb(0_0_0/0.25)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-10">
          <Link href="/" className="flex items-center gap-3 rounded-full" aria-label={`${clinic.name} — home`}>
            <Image src="/brand/tdc-logo-black.png" alt="" width={544} height={622} className="h-10 w-auto lg:h-11" preload />
            <span className="whitespace-nowrap font-display text-[1.0625rem] font-medium leading-none tracking-tight">
              TDC <span className="font-light">Dental</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const current = isCurrent(item, pathname);
                return (
                  <li key={item.label}>
                    <NavLink
                      item={item}
                      current={current}
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-mist hover:text-ink ${
                        current ? "bg-mist font-medium text-ink" : "text-ink/75"
                      }`}
                    >
                      {item.label}
                      {"external" in item && <ArrowUpRightIcon className="size-3" />}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={bookingHref} className="px-5 sm:px-6" aria-label="Book an Appointment">
              <span className="sm:hidden">Book</span>
              <span className="max-sm:hidden">Book an Appointment</span>
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              className="relative grid size-12 place-items-center rounded-full border border-line transition-colors hover:border-ink xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span aria-hidden className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-paper px-4 pb-36 pt-4 sm:px-6 xl:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-line">
            {nav.map((item) => {
              const current = isCurrent(item, pathname);
              return (
                <li key={item.label}>
                  <NavLink
                    item={item}
                    current={current}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-4 font-display text-2xl tracking-tight ${current ? "font-medium" : ""}`}
                  >
                    <span className="inline-flex items-center gap-3">
                      {item.label}
                      {current && <span aria-hidden className="size-2 rounded-full bg-ink" />}
                    </span>
                    {"external" in item && <ArrowUpRightIcon className="size-5 text-muted" />}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-8 grid gap-3">
          <ButtonLink href={bookingHref} onClick={() => setOpen(false)} arrow>
            Book an Appointment
          </ButtonLink>
          <ButtonLink href={clinic.phoneHref} variant="secondary">
            Call {clinic.phoneDisplay}
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm leading-relaxed text-muted">
          {clinic.address}
          <br />
          <a className="underline underline-offset-4" href={`mailto:${clinic.email}`}>
            {clinic.email}
          </a>
        </p>
      </div>
    </header>
  );
}
