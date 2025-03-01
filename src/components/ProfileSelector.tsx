// src/components/ProfileSelector.tsx
"use client";

import { SelectField } from "@aws-amplify/ui-react";
import { useData } from "@/context/DataContext";

export default function ProfileSelector() {
  const { profiles, selectedProfile, setSelectedProfile } = useData();

  return (
    <div className="mb-4">
      <SelectField
        label="Select Profile"
        id="profile-select"
        value={selectedProfile?.id || ""}
        onChange={(e) => {
          const newProfile =
            profiles.find((p) => p.id === e.target.value) || null;
          setSelectedProfile(newProfile);
        }}
        className="max-w-xs"
      >
        <option value="">-- Choose a profile --</option>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </SelectField>
    </div>
  );
}
