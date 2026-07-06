import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

import Container from "@/components/ui/Container";
import logo from "@/assets/logo/logo.png";

import { footerData } from "./footerData";

export default function Footer() {
  return (
    <footer className="bg-[#063B24] text-white">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          {/* Logo */}

          <div>
            <img src={logo} alt="Maliha Poly Tex" className="h-14" />

            <p className="mt-6 max-w-xs text-sm leading-7 text-green-100">
              Improving Sustainable Lifestyle & Environment through premium 100%
              recycled polyesteer staple fiber.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-3">
              {footerData.quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-green-100 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="mb-5 text-lg font-semibold">Company</h3>

            <ul className="space-y-3">
              {footerData.company.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-green-100 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-lg font-semibold">Contact</h3>

            <ul className="space-y-4 text-green-100">
              <li className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0" />
                <span>{footerData.contact.address}</span>
              </li>

              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span>{footerData.contact.phone}</span>
              </li>

              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span>{footerData.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 py-6 text-center text-sm text-green-100">
          © {new Date().getFullYear()} Maliha Poly Tex Fiber Industry Ltd. All
          Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}
