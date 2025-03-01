"use client";

import { useState } from "react";
import {
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import ProfileSelector from "@/components/ProfileSelector";
import Experiences from "@/components/Experiences";
import Profiles from "@/components/Profiles";
import { DataProvider } from "@/context/DataContext";

const sections = [
  { name: "Profile", icon: UserIcon },
  { name: "Experience", icon: BriefcaseIcon },
  { name: "Education", icon: AcademicCapIcon },
  { name: "Certifications", icon: CheckBadgeIcon },
];

function DashboardContent() {
  // const { selectedProfile, setSelectedProfile } = useData();
  const [activeSection, setActiveSection] = useState("Profiles");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "Profile":
        return <Profiles />;
      case "Experience":
        return <Experiences />;
      default:
        return <Profiles />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
          } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-30 w-64 bg-gray-100 p-4 overflow-y-auto`}
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
        <main className="flex-1 p-6 overflow-auto">
          {activeSection !== "Profiles" && (
            <div className="w-full max-w-xs mb-4">
              <ProfileSelector />
            </div>
          )}
          {renderSection()}
        </main>
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

export default function Dashboard() {
  return (
    <DataProvider>
      <DashboardContent />
    </DataProvider>
  );
}
