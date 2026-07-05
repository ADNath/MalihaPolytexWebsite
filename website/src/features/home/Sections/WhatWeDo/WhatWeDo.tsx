import Container from "@/components/ui/Container";

import WhatWeDoCard from "./WhatWeDoCard";
import { whatWeDoData } from "./whatWeDoData";

export default function WhatWeDo() {
  return (
    <section className="relative -mt-12 z-10 pb-10 lg:pb-10">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {whatWeDoData.map((item) => (
            <WhatWeDoCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
