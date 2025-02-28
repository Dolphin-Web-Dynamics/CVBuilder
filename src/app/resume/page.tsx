"use client";

import type React from "react";
import { useContext, useState } from "react";
import { ResumeContext } from "@/context/ResumeContext";
import {
  ClassicTemplate,
  ModernTemplate,
  CustomTemplate,
} from "@/components/templates";
import { Bars3Icon } from "@heroicons/react/24/solid";
import SidebarPanel from "@/components/SidebarPanel";
import MobileSidebar from "@/components/MobileSidebar";
import UnsupportedBrowserWarning from "@/components/UnsupportedBrowserWarning";
import PrintButton from "@/components/PrintButton";

function ResumePage() {
  const { resumeData } = useContext(ResumeContext);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderTemplate = () => {
    switch (resumeData.selectedTemplate) {
      case "modern":
        return <ModernTemplate data={resumeData} />;
      case "classic":
        return <ClassicTemplate data={resumeData} />;
      case "custom":
        return <CustomTemplate data={resumeData} />;
      default:
        return <p>Template not found.</p>;
    }
  };

  return (
    <>
      <UnsupportedBrowserWarning />
      <div className="flex flex-col xl:flex-row gap-2">
        {/* Desktop Sidebar */}
        <div className="hidden xl:block print:hidden">
          <SidebarPanel />
        </div>

        {/* Mobile Sidebar Toggle Button */}
        <div className="xl:hidden fixed bottom-4 right-4 z-50 print:hidden">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="bg-blue-500 text-white p-2 rounded-full shadow-md"
            aria-label="Toggle Sidebar"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Resume Preview */}
        <div className="w-full flex justify-center">
          <div className="bg-gray-100 xl:w-[calc(8.5in)] print:m-0 grid">
            <PrintButton />
            {/* Resume Preview Container */}
            <div className="bg-white mx-auto my-4 p-[.5in] print:p-0 rounded-md print:visible print:[&_*]:visible print:w-fit max-w-[8in] overflow-auto shadow-md print:shadow-none">
              <div
                className="w-full print:absolute print:left-0 print:top-0 print:w-full transform-gpu scale-[0.85] sm:scale-90 md:scale-95 xl:scale-100 print:scale-none origin-top"
                style={{ padding: `${resumeData.resumeMargin || 0.0}in` }}
              >
                {resumeData.selectedTemplate ? (
                  renderTemplate()
                ) : (
                  <p className="text-center">
                    Select a template to preview your resume.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumePage;
