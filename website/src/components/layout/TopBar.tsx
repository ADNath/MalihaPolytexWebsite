import { Phone, Mail } from "lucide-react";

interface TopBarProps {
  isScrolled: boolean;
}

export default function TopBar({ isScrolled }: TopBarProps) {
  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[60] h-10 bg-[#035D34] text-sm text-white transition-transform duration-300 ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container-custom flex h-full items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone size={15} />
            <span>+88-02-55093715</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={15} />
            <span>malihapolytex@malihabd.com</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          
        </div>
      </div>
    </div>
  );
}