import { Container } from "lucide-react";
import HighlightCard from "./HighlightCard";
import { highlights } from "./highlightsData";

export default function Highlights() {
  return (
    <section className="relative z-20 -mt-20 pb-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <HighlightCard
              key={item.title}
              {...item}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}