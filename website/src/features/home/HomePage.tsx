import Hero from "./Components/Hero/Hero";
import Highlights from "./Components/Highlights/Highlights";
import WhatWeDo from "@/features/home/Sections/WhatWeDo";
import CompanyVideo from "./Components/CompanyVideo";
import ContactUs from "../contactUs";
import usePageTitle from "@/hooks/usePageTitle";
import Certificate from "./Sections/Certificate";

export default function Home() {
  usePageTitle("Maliha Poly Tex Fiber Industry Ltd.");
  return (
    <>
      <Hero />
      <Highlights />
      <WhatWeDo />
      <CompanyVideo />
      <Certificate />
      <ContactUs />     
    </>
  );
}
