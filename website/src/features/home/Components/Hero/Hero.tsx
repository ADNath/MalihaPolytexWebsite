import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import hero1 from "../../../../assets/slider/banner1.jpg";
import hero2 from "../../../../assets/slider/banner2.jpg";
import hero3 from "../../../../assets/slider/banner4.jpg";
import Button from "../../../../components/ui/Button";

const slides = [
  {
    image: hero2,
    title: "Turning Waste Into High Quality Fiber",
    subtitle: "RECYCLING FOR SUSTAINABILITY",
    description:
      "Bangladesh's First GRS Certified PSF Manufacturer committed to sustainable textiles and a better tomorrow.",
  },
  {
    image: hero1,
    title: "Premium Recycled Polyester Fiber",
    subtitle: "SUSTAINABLE MANUFACTURING",
    description:
      "Producing eco-friendly recycled polyester staple fiber using world-class technology.",
  },
  {
    image: hero3,
    title: "Building A Greener Future",
    subtitle: "GLOBAL QUALITY",
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
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative min-h-[650px] h-[calc(100vh-120px)] bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />

              {/* Content */}
              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-start px-6 pt-28 lg:px-8">
                <div className="max-w-xl text-white">
                  <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-green-400">
                    {slide.subtitle}
                  </p>

                  <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="mb-10 text-lg leading-8 text-gray-200">
                    {slide.description}
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button to="/products">Explore Products</Button>

                    <Button to="/contact" variant="outline">
                      Contact Us
                    </Button>
                  </div>

                  {/* Custom Pagination */}
                  <div className="mt-16 flex items-center gap-8">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => swiperRef.current?.slideToLoop(index)}
                        className="group flex items-center gap-3"
                      >
                        <span
                          className={`text-sm font-semibold ${
                            activeIndex === index
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`h-[2px] transition-all duration-300 ${
                            activeIndex === index
                              ? "w-16 bg-green-500"
                              : "w-10 bg-gray-500"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-black"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-black"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
}
