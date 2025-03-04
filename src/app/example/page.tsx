"use client";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import ProfileSelector from "@/components/ProfileSelector";
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

export default function Page() {
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
      <AppSidebar setActiveSection={setActiveSection} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
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
          </div>
        </header>
        {/* skeleton */}
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div> */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {activeSection !== "Profiles" && (
            <div className="w-full max-w-xs mb-4">
              <ProfileSelector />
            </div>
          )}
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
