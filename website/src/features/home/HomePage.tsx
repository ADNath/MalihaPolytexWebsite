import Hero from "./Components/Hero/Hero";
import Highlights from "./Components/Highlights/Highlights";
import WhatWeDo from "@/features/home/Sections/WhatWeDo";
import CompanyVideo from "./Components/CompanyVideo";
import CompanyProfile from "./Components/CompanyProfile";
import Certificate from "./Sections/Certificate";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <WhatWeDo />
      <CompanyVideo />
      <CompanyProfile />
      <Certificate />
    </>
  );
}
