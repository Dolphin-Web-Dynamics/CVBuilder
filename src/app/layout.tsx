// src/app/layout.tsx

"use client";

import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext";
import { Navbar } from "@/components/navbar";
import { AmplifyProvider } from "@/context/AmplifyContext";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { usePathname } from "next/navigation";

// Define a single routes array with a "protected" flag
const navRoutes = [
  { name: "Home", path: "/", protected: false },
  { name: "Resume", path: "/resume", protected: true },
  { name: "Dashboard", path: "/dashboard", protected: true },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Determine if the current route is protected
  const isProtected = navRoutes.some(
    (route) => route.protected && pathname.startsWith(route.path)
  );

  return (
    <html lang="en">
      <body className="bg-gray-100 print:bg-white">
        <div className="min-h-screen flex flex-col">
          {/* Pass the full navRoutes array to Navbar */}
          <Navbar
            className="px-4 print:hidden"
            routes={navRoutes}
            buttonLink="/resume"
          />
          <AmplifyProvider>
            {isProtected ? (
              <Authenticator className="flex-1 py-2 mx-2">
                <ResumeProvider>
                  <main className="flex-1 py-2 mx-2">{children}</main>
                </ResumeProvider>
              </Authenticator>
            ) : (
              <ResumeProvider>
                <main className="flex-1 py-2 mx-2">{children}</main>
              </ResumeProvider>
            )}
          </AmplifyProvider>
        </div>
      </body>
    </html>
  );
}
