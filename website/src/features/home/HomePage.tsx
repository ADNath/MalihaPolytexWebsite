import Hero from "./Components/Hero/Hero";
import Highlights from "./Components/Highlights/Highlights";
import WhatWeDo from "@/features/home/Sections/WhatWeDo";
import CompanyVideo from "./Components/CompanyVideo";
import CompanyOverview from "./Sections/CompanyOverview";
import ContactUs from "../contactUs";
import usePageTitle from "@/hooks/usePageTitle";

export default function Home() {
  usePageTitle("Maliha Poly Tex Fiber Industry Ltd.");
  return (
    <>
      <Hero />
      <Highlights />
      <WhatWeDo />
      <CompanyVideo />
      <CompanyOverview />
      <ContactUs />     
    </>
  );
}
