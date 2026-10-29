import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
export const ArrowUpRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);
export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);
export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
);
export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </Svg>
);
export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
export const WhatsAppIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
    <path d="M9 9.5c.3 1.6 2 3.6 4.5 4.6l1.3-1.2 1.7.8c-.2 1.1-1 1.8-2 1.8-3 0-6.5-3.3-6.5-6.3 0-1 .7-1.8 1.8-2l.8 1.6z" />
  </Svg>
);
export const PlusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const QuoteIcon = (p: IconProps) => (
  <svg viewBox="0 0 32 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M0 24V14.4C0 6.4 4.3 1.6 12.8 0l1.4 3.4C9.6 4.6 7.4 7.3 7.2 11.2H13V24H0Zm18.9 0V14.4C18.9 6.4 23.2 1.6 31.7 0L33 3.4c-4.6 1.2-6.8 3.9-7 7.8h5.8V24H18.9Z" />
  </svg>
);

/* Pillar icons */
export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 5 6v5.5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);
export const SparkIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" />
    <path d="M19 16c.2 1.5.8 2.1 2.3 2.3-1.5.2-2.1.8-2.3 2.3-.2-1.5-.8-2.1-2.3-2.3 1.5-.2 2.1-.8 2.3-2.3Z" />
  </Svg>
);
export const PeopleIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 19.5c.6-3.3 3-5.3 6-5.3s5.4 2 6 5.3" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16.5 14.3c2.4.2 4 1.9 4.5 4.7" />
  </Svg>
);

/* Service icons: simple line drawings built around a tooth outline */
const tooth = "M8 3.5c-2.6 0-4 2-4 4.5 0 2 .8 3.4 1.3 5 .6 2.2.7 7.5 2.7 7.5 1.6 0 1.5-4.5 4-4.5s2.4 4.5 4 4.5c2 0 2.1-5.3 2.7-7.5.5-1.6 1.3-3 1.3-5 0-2.5-1.4-4.5-4-4.5-1.6 0-2.4.8-4 .8s-2.4-.8-4-.8Z";

export const serviceIcons = {
  implant: (p: IconProps) => (
    <Svg {...p}>
      <path d="M7 3.5h10c1 0 1.5.6 1.5 1.5 0 2.4-1.4 3.5-3 4H8.5c-1.6-.5-3-1.6-3-4 0-.9.5-1.5 1.5-1.5Z" />
      <path d="M9 11h6M9.5 13.5h5M10 16h4M10.5 18.5h3M12 9v12" />
    </Svg>
  ),
  restore: (p: IconProps) => (
    <Svg {...p}>
      <path d={tooth} />
      <path d="M9.5 8.5h5" />
    </Svg>
  ),
  veneer: (p: IconProps) => (
    <Svg {...p}>
      <path d={tooth} />
      <path d="M6.2 6.5c1.6-1 3.6-1 5.8-.2" />
    </Svg>
  ),
  smile: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3 9.5c2.6 1.7 5.6 2.5 9 2.5s6.4-.8 9-2.5c-.5 5.6-4.3 9-9 9s-8.5-3.4-9-9Z" />
      <path d="M7 12.2v3.6M10.3 12.8v4.6M13.7 12.8v4.6M17 12.2v3.6" />
    </Svg>
  ),
  whiten: (p: IconProps) => (
    <Svg {...p}>
      <path d={tooth} />
      <path d="M19.5 2.5v3M18 4h3" />
    </Svg>
  ),
  aligner: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3 8.5c3-2 5.9-3 9-3s6 1 9 3" />
      <path d="M4.5 9.8C5 14.5 8 18.5 12 18.5s7-4 7.5-8.7" />
      <path d="M7.3 7.6c.8 3.4 2.5 5.5 4.7 5.5s3.9-2.1 4.7-5.5" />
    </Svg>
  ),
};

export const pillarIcons = { shield: ShieldIcon, spark: SparkIcon, people: PeopleIcon };
