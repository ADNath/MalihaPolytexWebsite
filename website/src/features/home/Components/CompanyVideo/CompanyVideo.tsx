import Container from "@/components/ui/Container";

import CompanyVideoContent from "./CompanyVideoContent";
import CompanyVideoPlayer from "./CompanyVideoPlayer";

export default function CompanyVideo() {
  return (
    <section className="py-10 lg:py-10">
      <Container size="xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <CompanyVideoPlayer />

          <CompanyVideoContent />
        </div>
      </Container>
    </section>
  );
}