import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/common/PageHero";
import PageIntroduction from "../components/PageIntroduction";
import ManagementCard from "../components/ManagementCard";
import usePageTitle from "@/hooks/usePageTitle";

import { getImageUrl } from "@/utils/image";
import { getManagementMembers } from "@/services/api/managementMemberApi";

interface ManagementMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  message: string;
}

export default function TopManagementPage() {
  usePageTitle("Top Management | Maliha Poly Tex Fiber Industry Ltd.");

  const [members, setMembers] = useState<ManagementMember[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMembers() {
    try {
      setLoading(true);

      const response = await getManagementMembers();

      if (response.success) {
        const data: ManagementMember[] = response.data
          .filter((x) => x.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((x) => ({
            id: x.managementMemberId,
            name: x.name,
            designation: x.designation,
            image: getImageUrl(x.imageUrl),
            message: x.message,
          }));

        setMembers(data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadMembers();
  }, []);

  return (
    <>
      <PageHero
        title="Top Management"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
          { label: "Top Management" },
        ]}
      />

      <PageIntroduction
        eyebrow="Leadership"
        title="Meet Our Leadership Team"
        description="Our leadership team is committed to innovation, operational excellence, and sustainable growth. Their vision and experience continue to drive Maliha Poly Tex Fiber Industry Limited toward becoming a trusted global textile manufacturer."
      />

      <section className="bg-gray-50 py-20">
        <Container size="xl">
          {loading ? (
            <div className="py-20 text-center text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-16">
              {members.map((member, index) => (
                <ManagementCard
                  key={member.id}
                  member={member}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
