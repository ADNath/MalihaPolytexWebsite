import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

export interface ContactItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  actionLabel?: string;
  lines: {
    text: string;
    href?: string;
  }[];
}

export const contactData: ContactItem[] = [
  {
    title: "Call Us",
    icon: Phone,
    actionLabel: "Sat – Thu (9:30 AM – 6:30 PM)",
    lines: [
      {
        text: "+88 02-55093715",
        href: "tel:+880255093715",
      },
      {
        text: "+88 02-55093716",
        href: "tel:+880255093716",
      },
      {
        text: "+88 01713372017",
        href: "tel:+8801713372017",
      },
      {
        text: "+88 01713372015",
        href: "tel:+8801713372015",
      },
    ],
  },
  {
    title: "Email Us",
    icon: Mail,
    actionLabel: "We'll respond as soon as possible",
    lines: [
      {
        text: "malihapolytex@malihabd.com",
        href: "mailto:malihapolytex@malihabd.com",
      },
    ],
  },
  {
    title: "Visit Us",
    icon: MapPin,
    actionLabel: "View on Google Maps →",
    href: "https://maps.google.com/...",
    lines: [
      { text: "House #57, Gausul Azam Avenue" },
      { text: "Sector #14, Uttara" },
      { text: "Dhaka-1230, Bangladesh" },
    ],
  },
];
