import { useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Container from "@/components/ui/Container";

import { getCertificates } from "@/services/api/certificateApi";
import type { CertificateResponse } from "@/types/certificate";

import CertificateCard from "./CertificateCard";

export default function Certificate() {
  const [certificates, setCertificates] = useState<CertificateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [, setActiveIndex] = useState(0);

  async function loadCertificates() {
    try {
      setLoading(true);

      const response = await getCertificates();

      if (response.success) {
        setCertificates(
          response.data
            .filter((x) => x.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder),
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCertificates();
  }, []);

  if (loading || certificates.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <div className="mb-10 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              OUR CERTIFICATES
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Our Certifications
            </h2>
          </div>

          {certificates.length > 1 && (
            <div className="flex gap-3">
              <button
                type="button"
                disabled={swiper?.isBeginning}
                onClick={() => swiper?.slidePrev()}
                className={`
  flex h-11 w-11 items-center justify-center rounded-full border
  transition
  ${
    swiper?.isBeginning
      ? "cursor-not-allowed border-gray-300 text-gray-300"
      : "border-primary text-primary hover:bg-primary hover:text-white"
  }
`}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                disabled={swiper?.isEnd}
                onClick={() => swiper?.slideNext()}
                className={`
  flex h-11 w-11 items-center justify-center rounded-full border
  transition
  ${
    swiper?.isEnd
      ? "cursor-not-allowed border-gray-300 text-gray-300"
      : "border-primary text-primary hover:bg-primary hover:text-white"
  }
`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          slidesPerView={1}
          spaceBetween={32}
          speed={700}
          resistanceRatio={0.4}
          grabCursor
        >
          {certificates.map((certificate) => (
            <SwiperSlide key={certificate.certificateId}>
              <CertificateCard certificate={certificate} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
