import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export interface ContactItem {
  title: string;
  value: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export const contactData: ContactItem[] = [
  {
    title: "Call Us",
    value: "+880 1934 561780",
    description: "Mon – Sat (8:00AM – 6:00PM)",
    href: "tel:+8801934561780",
    icon: Phone,
  },
  {
    title: "Email Us",
    value: "info@malihapolytex.com",
    description: "We'll respond as soon as possible",
    href: "mailto:info@malihapolytex.com",
    icon: Mail,
  },
  {
    title: "Visit Us",
    value: "House #57, Gausul Azam Avenue",
  description: "Sector #14, Uttara, Dhaka-1230, Bangladesh",
    href: "#",
    icon: MapPin,
  },
  {
    title: "WhatsApp",
    value: "+880 1934 561780",
    description: "Chat with us on WhatsApp",
    href: "https://wa.me/8801934561780",
    icon: MessageCircle,
  },
];