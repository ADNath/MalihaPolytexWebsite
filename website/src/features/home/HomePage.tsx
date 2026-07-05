import Hero from "./Components/Hero/Hero";
import Highlights from "./Components/Highlights/Highlights";
import WhatWeDo from "@/features/home/Sections/WhatWeDo";
import CompanyVideo from "./Components/CompanyVideo";
import CompanyOverview from "./Sections/CompanyOverview";
import ContactUs from "../contactUs";

export default function Home() {
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
