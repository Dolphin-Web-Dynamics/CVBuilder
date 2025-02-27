"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import SidebarPanel from "./SidebarPanel";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>("json");

  const sections = [
    { id: "json", title: "JSON Data" },
    { id: "picture", title: "Profile Picture" },
    { id: "margin", title: "Resume Margin" },
    { id: "template", title: "Template" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop:gray-600  z-[60]">
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
            <div className="px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Resume Editor
                </h2>
                <div className="ml-3 h-7 flex items-center">
                  <button
                    onClick={onClose}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 relative flex-1 px-4 sm:px-6">
              <div className="flex space-x-2 mb-4 overflow-x-auto">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      activeSection === section.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
              <SidebarPanel isMobile={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
