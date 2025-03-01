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
  selectedProfile: Schema["Profile"]["type"] | null;
  setSelectedProfile: (profile: Schema["Profile"]["type"] | null) => void;
  deleteProfile: (id: string) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Schema["Profile"]["type"][]>([]);
  const [experiences, setExperiences] = useState<
    Schema["Experience"]["type"][]
  >([]);
  const [selectedProfile, setSelectedProfile] = useState<
    Schema["Profile"]["type"] | null
  >(null);

  useEffect(() => {
    const profilesSub = client.models.Profile.observeQuery().subscribe({
      next: ({ items }) => {
        setProfiles([...items]);
      },
      error: (err) => console.error("Profiles subscription error:", err),
    });

    const experiencesSub = client.models.Experience.observeQuery().subscribe({
      next: ({ items }) => {
        setExperiences([...items]);
      },
      error: (err) => console.error("Experiences subscription error:", err),
    });

    return () => {
      profilesSub.unsubscribe();
      experiencesSub.unsubscribe();
    };
  }, []);

  // Optionally perform optimistic updates here:
  const deleteProfile = async (id: string) => {
    // Option 1: Optimistically update the state
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    try {
      await client.models.Profile.delete({ id });
    } catch (error) {
      console.error("Failed to delete profile:", error);
      // Optionally: refetch or revert the change if deletion fails.
    }
  };

  const deleteExperience = async (id: string) => {
    // Option 1: Optimistically update the state
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    try {
      await client.models.Experience.delete({ id });
    } catch (error) {
      console.error("Failed to delete experience:", error);
      // Optionally: refetch or revert the change if deletion fails.
    }
  };

  return (
    <DataContext.Provider
      value={{
        profiles,
        experiences,
        selectedProfile,
        setSelectedProfile,
        deleteProfile,
        deleteExperience,
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
