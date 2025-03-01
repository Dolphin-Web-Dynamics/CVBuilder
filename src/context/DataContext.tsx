// src/context/DataContext.tsx
"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "amplify/data/resource";

const client = generateClient<Schema>();

interface DataContextType {
  profiles: Schema["Profile"]["type"][];
  experiences: Schema["Experience"]["type"][];
  degrees: Schema["Degree"]["type"][];
  certifications: Schema["Certification"]["type"][];
  selectedProfile: Schema["Profile"]["type"] | null;
  setSelectedProfile: (profile: Schema["Profile"]["type"] | null) => void;
  deleteProfile: (id: string) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  deleteDegree: (id: string) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Schema["Profile"]["type"][]>([]);
  const [experiences, setExperiences] = useState<
    Schema["Experience"]["type"][]
  >([]);
  const [degrees, setDegrees] = useState<Schema["Degree"]["type"][]>([]);
  const [certifications, setCertifications] = useState<
    Schema["Certification"]["type"][]
  >([]);
  const [selectedProfile, setSelectedProfile] = useState<
    Schema["Profile"]["type"] | null
  >(null);

  useEffect(() => {
    const profilesSub = client.models.Profile.observeQuery().subscribe({
      next: ({ items }) => setProfiles([...items]),
      error: (err) => console.error("Profiles subscription error:", err),
    });
    const experiencesSub = client.models.Experience.observeQuery().subscribe({
      next: ({ items }) => setExperiences([...items]),
      error: (err) => console.error("Experiences subscription error:", err),
    });
    const degreesSub = client.models.Degree.observeQuery().subscribe({
      next: ({ items }) => setDegrees([...items]),
      error: (err) => console.error("Degrees subscription error:", err),
    });
    const certificationsSub =
      client.models.Certification.observeQuery().subscribe({
        next: ({ items }) => setCertifications([...items]),
        error: (err) =>
          console.error("Certifications subscription error:", err),
      });

    return () => {
      profilesSub.unsubscribe();
      experiencesSub.unsubscribe();
      degreesSub.unsubscribe();
      certificationsSub.unsubscribe();
    };
  }, []);

  const deleteProfile = async (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    try {
      await client.models.Profile.delete({ id });
    } catch (error) {
      console.error("Failed to delete profile:", error);
    }
  };

  const deleteExperience = async (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    try {
      await client.models.Experience.delete({ id });
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  const deleteDegree = async (id: string) => {
    setDegrees((prev) => prev.filter((deg) => deg.id !== id));
    try {
      await client.models.Degree.delete({ id });
    } catch (error) {
      console.error("Failed to delete degree:", error);
    }
  };

  const deleteCertification = async (id: string) => {
    setCertifications((prev) => prev.filter((cert) => cert.id !== id));
    try {
      await client.models.Certification.delete({ id });
    } catch (error) {
      console.error("Failed to delete certification:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        profiles,
        experiences,
        degrees,
        certifications,
        selectedProfile,
        setSelectedProfile,
        deleteProfile,
        deleteExperience,
        deleteDegree,
        deleteCertification,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
