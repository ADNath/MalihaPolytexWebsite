import { Phone, Mail } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

export default function TopBar() {
  return (
    <div className="bg-[#035D34] text-white text-sm">
      <div className="container-custom h-10 flex items-center justify-between">
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
          <FaFacebookF className="cursor-pointer hover:text-green-200 transition" />

          <FaLinkedinIn className="cursor-pointer hover:text-green-200 transition" />
        </div>
      </div>
    </div>
  );
}
