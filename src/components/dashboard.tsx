"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

// Import your content components
import Profiles from "@/components/Profiles";
import Experiences from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
// import Openings from "@/components/Openings";
// import Resume from "@/components/Resume";
// import Composer from "@/components/Composer";
// import AIEnhancer from "@/components/AIEnhancer";
// import Templates from "@/components/Templates";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Profiles");

  const renderContent = () => {
    switch (activeSection) {
      case "Profiles":
        return <Profiles />;
      case "Experience":
        return <Experiences />;
      case "Education":
        return <Education />;
      case "Certifications":
        return <Certifications />;
      case "Openings":
      // return <Openings />;
      //   case "Resume":
      //     return <Resume />;
      //   case "Composer":
      //     return <Composer />;
      //   case "AI Enhancer":
      //     return <AIEnhancer />;
      //   case "Templates":
      //     return <Templates />;
      default:
        return <Profiles />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Pass setActiveSection so sidebar items update the main content */}
        <AppSidebar setActiveSection={setActiveSection} />
        <SidebarInset className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto w-full">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

/** Dashboard Header - Contains Breadcrumbs and Navigation trigger */
function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
