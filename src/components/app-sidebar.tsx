"use client";

import * as React from "react";
import {
  Users,
  Briefcase,
  FileText,
  Edit3,
  Brain,
  Layers,
  LifeBuoy,
  Send,
  LayoutGrid,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "anelcanto",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  workspace: [
    {
      title: "Profiles",
      url: "/profiles",
      icon: Users,
      isActive: true,
      items: [
        { title: "Experience", url: "#" },
        { title: "Education", url: "#" },
        { title: "Certifications", url: "#" },
      ],
    },
    {
      title: "Openings",
      url: "#",
      icon: Briefcase,
    },
    {
      title: "Resume",
      url: "#",
      icon: FileText,
    },
  ],
  tools: [
    {
      title: "Composer",
      url: "#",
      icon: Edit3,
    },
    {
      title: "AI Enhancer",
      url: "#",
      icon: Brain,
    },
    {
      title: "Templates",
      url: "#",
      icon: Layers,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({
  setActiveSection,
  ...props
}: { setActiveSection: (section: string) => void } & React.ComponentProps<
  typeof Sidebar
>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LayoutGrid className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">CV Builder</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          groupLabel="Workspace"
          items={data.workspace}
          setActiveSection={setActiveSection}
        />
        <NavMain
          groupLabel="Tools"
          items={data.tools}
          setActiveSection={setActiveSection}
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
