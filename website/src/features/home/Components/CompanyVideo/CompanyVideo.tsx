import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";

import { getCompanyVideos } from "@/services/api/companyVideoApi";
import type { CompanyVideoResponse } from "@/types/companyVideo";

import CompanyVideoContent from "./CompanyVideoContent";
import CompanyVideoPlayer from "./CompanyVideoPlayer";

export default function CompanyVideo() {
  const [video, setVideo] = useState<CompanyVideoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadVideo() {
    try {
      setLoading(true);

      const response = await getCompanyVideos();

      if (response.success) {
        const item = response.data
          .filter((x) => x.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder)[0];

        setVideo(item ?? null);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void loadVideo();
  }, []);

  if (loading || !video) {
    return null;
  }

  return (
    <section className="py-10 lg:py-10">
      <Container size="xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <CompanyVideoPlayer video={video} />

          <CompanyVideoContent video={video} />
        </div>
      </Container>
    </section>
  );
}
