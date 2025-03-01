"use client";

import { useState } from "react";
import {
  ActiveSectionProvider,
  useActiveSection,
} from "@/context/ActiveSectionContext";
import {
  UsersIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const sections = [
  { name: "Profiles", icon: UsersIcon },
  { name: "Experience", icon: BriefcaseIcon },
  { name: "Education", icon: AcademicCapIcon },
  { name: "Certifications", icon: CheckBadgeIcon },
];

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { activeSection, setActiveSection } = useActiveSection();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen">
      {/* Mobile Header */}
      <header className="md:hidden bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed top-16 bottom-0 left-0 z-30 w-64 bg-gray-100 p-4 overflow-y-auto`}
        >
          <nav>
            <ul>
              {sections.map((section) => (
                <li key={section.name} className="mb-2">
                  <button
                    className={`flex items-center p-2 w-full text-left rounded hover:bg-gray-200 ${
                      activeSection === section.name ? "bg-gray-200" : ""
                    }`}
                    onClick={() => {
                      setActiveSection(section.name);
                      setIsSidebarOpen(false);
                    }}
                  >
                    <section.icon className="h-5 w-5 mr-2" />
                    <span>{section.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto md:ml-64">{children}</main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ActiveSectionProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ActiveSectionProvider>
  );
}
