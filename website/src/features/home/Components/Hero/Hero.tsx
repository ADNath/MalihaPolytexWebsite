// Hero.tsx
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

import hero1 from "@/assets/slider/banner1.jpg";
import hero2 from "@/assets/slider/banner2.jpg";
import hero3 from "@/assets/slider/banner4.jpg";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const slides = [
  {
    image: hero2,
    subtitle: "RECYCLING FOR SUSTAINABILITY",
    title: "Turning Waste Into High Quality Fiber",
    description:
      "Bangladesh's First GRS Certified PSF Manufacturer committed to sustainable textiles and a better tomorrow.",
  },
  {
    image: hero1,
    subtitle: "SUSTAINABLE MANUFACTURING",
    title: "Premium Recycled Polyester Fiber",
    description:
      "Producing eco-friendly recycled polyester staple fiber using world-class technology.",
  },
  {
    image: hero3,
    subtitle: "GLOBAL QUALITY",
    title: "Building A Greener Future",
    description:
      "Delivering premium recycled fiber to customers around the world.",
  },
];

export default function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className="relative h-[600px] sm:h-[680px] lg:h-[calc(100vh-120px)] bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

              <Container className="relative z-10 flex h-full flex-col justify-between py-16 lg:py-28">
                <div className="max-w-md text-white lg:max-w-xl">
                  <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-green-400">
                    {slide.subtitle}
                  </p>

                  <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 text-base leading-7 text-white-200 lg:text-lg lg:leading-8">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button to="/products">Explore Products</Button>

                    <Button to="/contact" variant="outline">
                      Contact Us
                    </Button>
                  </div>
                </div>

                <div className="pb-4 lg:pb-0">
                  <div className="flex items-center gap-6">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => swiperRef.current?.slideToLoop(index)}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={
                            activeIndex === index
                              ? "text-sm font-semibold text-white"
                              : "text-sm font-semibold text-gray-400"
                          }
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={
                            activeIndex === index
                              ? "h-[2px] w-16 bg-green-500 transition-all"
                              : "h-[2px] w-10 bg-gray-500 transition-all"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-black lg:flex"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-black lg:flex"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
}
