import {
  FooterInstagramIcon,
  FooterFacebookIcon,
  FooterYoutubeIcon,
  FooterXICon,
  FooterBlogIcon,
} from "../../icons";

interface FooterLink {
  id: string;
  text: string;
  href: string;
  subItems?: FooterLink[];
}

interface FooterSocial {
  name: string;
  icon: React.ComponentType | string;
  link?: string;
}

export const footerLinks: FooterLink[] = [
  {
    id: "1",
    text: "Home",
    href: "/",
  },
  {
    id: "2",
    text: "About Us",
    href: "/about-us/we-are",
    subItems: [
      { id: "2-1", text: "We Are", href: "/about-us/we-are" },
      { id: "2-2", text: "Teamwork", href: "/about-us/team-work" },
      { id: "2-3", text: "Core Values", href: "/about-us/core-value" },
      { id: "2-4", text: "Careers", href: "/about-us/careers" },
    ],
  },
  {
    id: "3",
    text: "Addeep Is",
    href: "/addeep-is/digital-platform-innovation",
    subItems: [
      {
        id: "3-1",
        text: "Digital Platform Innovation",
        href: "/addeep-is/digital-platform-innovation",
      },
      { id: "3-2", text: "Addeep GPR AI Summary", href: "/addeep-is/summary" },
      {
        id: "3-3",
        text: "Addeep S2E Social Media Summary",
        href: "/addeep-is/summary?type=sns",
      },
      {
        id: "3-4",
        text: "Addeep Social to Earn",
        href: "/addeep-is/platform-to-earn",
      },
    ],
  },
  {
    id: "4",
    text: "Blog & Social Media Channels",
    href: "/blog-social-media-channel",
  },
  {
    id: "5",
    text: "Announcement",
    href: "/announcement",
  },
  {
    id: "6",
    text: "Press & Media",
    href: "/press-media",
  },
  {
    id: "7",
    text: "IR Library",
    href: "/article",
  },
  { id: "8", text: "Event", href: "/events" },
];

export const socialIcons: FooterSocial[] = [
  {
    name: "blog",
    icon: FooterBlogIcon,
    link: "https://blog.naver.com/addeep/",
  },
  {
    name: "instagram",
    icon: FooterInstagramIcon,
    link: "https://www.instagram.com/addeep_/",
  },
  {
    name: "facebook",
    icon: FooterFacebookIcon,
    link: "https://www.facebook.com/share/1BTnZGhM8g",
  },
  {
    name: "X",
    icon: FooterXICon,
    link: "https://x.com/Addeep_",
  },
  {
    name: "youtube",
    icon: FooterYoutubeIcon,
    link: "https://www.youtube.com/@addeep_",
  },
];
