type Item =
  | { label: string; href: string; external?: boolean }
  | { label: string; children: { label: string; href: string }[] };

export type DefaultLinkType = {
  label: string;
  href: string;
  external?: boolean;
};

export const NAV: Item[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    children: [
      { label: "We Are", href: "/about-us/we-are" },
      { label: "Teamwork", href: "/about-us/team-work" },
      { label: "Core Value", href: "/about-us/core-value" },
      { label: "Careers", href: "/about-us/careers" },
    ],
  },
  {
    label: "Addeep Is",
    children: [
      {
        label: "Digital Platform Innovation",
        href: "/addeep-is/digital-platform-innovation",
      },
      { label: "Addeep GPR AI Summary", href: "/addeep-is/summary" },
      {
        label: "Addeep S2E Social Media Summary",
        href: "/addeep-is/summary?type=sns",
      },
      { label: "Addeep Social to Earn", href: "/addeep-is/platform-to-earn" },
    ],
  },
  { label: "Blog & Social Media Channels", href: "/blog-social-media-channel" },
  { label: "Announcement", href: "/announcement" },
  { label: "Press & Media", href: "/press-media" },
  { label: "IR Library", href: "/ir-library" },
  { label: "Event", href: "/events" },
];
