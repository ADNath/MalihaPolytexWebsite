import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";

export default function CertificateNavigation() {
  const swiper = useSwiper();

  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => swiper.slidePrev()}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-white"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={() => swiper.slideNext()}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-white"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}