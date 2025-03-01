"use client";

import { useActiveSection } from "@/context/ActiveSectionContext";
import ProfileSelector from "@/components/ProfileSelector";
import Profiles from "@/components/Profiles";
import Experiences from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";

export default function DashboardPage() {
  const { activeSection } = useActiveSection();

  const renderSection = () => {
    switch (activeSection) {
      case "Profiles":
        return <Profiles />;
      case "Experience":
        return <Experiences />;
      case "Education":
        return <Education />;
      case "Certifications":
        return <Certifications />;
      default:
        return null;
    }
  };

  return (
    <div>
      {activeSection !== "Profiles" && (
        <div className="w-full max-w-xs mb-4">
          <ProfileSelector />
        </div>
      )}
      {renderSection()}
    </div>
  );
}
