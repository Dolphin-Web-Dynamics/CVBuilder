// src/components/Certifications.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CertificationUpdateForm from "ui-components/CertificationUpdateForm";
import CertificationCreateForm from "ui-components/CertificationCreateForm";
import { useData } from "@/context/DataContext";

export default function Certifications() {
  const { certifications, selectedProfile, deleteCertification } = useData();
  const [expandedCerts, setExpandedCerts] = React.useState<Set<string>>(
    new Set()
  );
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  // Filter certifications based on the selected profile
  const filteredCerts = selectedProfile
    ? certifications.filter((cert) => cert.profileId === selectedProfile.id)
    : [];

  const toggleExpand = (id: string) => {
    setExpandedCerts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Certifications</h2>

      {!selectedProfile && (
        <p className="text-muted-foreground mb-4">
          Please select a profile to view certifications.
        </p>
      )}

      <div className="flex flex-col gap-3 my-4">
        {filteredCerts.length === 0 && selectedProfile && (
          <p className="text-muted-foreground text-sm italic">
            No certifications added yet. Add your first certification below.
          </p>
        )}

        {filteredCerts.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">
                    {item.certification_name}
                    {item.issuing_organization &&
                      ` from ${item.issuing_organization}`}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {item.year_earned}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(item.id)}
                    aria-label={
                      expandedCerts.has(item.id)
                        ? "Collapse details"
                        : "Expand details"
                    }
                  >
                    {expandedCerts.has(item.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Delete certification"
                    onClick={() => deleteCertification(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedCerts.has(item.id) && (
              <CardContent className="px-4 pb-4 pt-0">
                <CertificationUpdateForm
                  certification={item}
                  onSubmit={(fields) => {
                    toggleExpand(item.id);
                    return fields;
                  }}
                />
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant={showCreateForm ? "outline" : "default"}
          className="w-full sm:w-auto"
          onClick={() => setShowCreateForm((prev) => !prev)}
        >
          {showCreateForm ? "Cancel" : "Add New Certification"}
          {showCreateForm ? (
            <Minus className="h-4 w-4 ml-2" />
          ) : (
            <Plus className="h-4 w-4 ml-2" />
          )}
        </Button>

        {showCreateForm && (
          <Card className="mt-4 p-4">
            <CertificationCreateForm
              onSubmit={(fields) => {
                setShowCreateForm(false);
                return { ...fields, profileId: selectedProfile?.id };
              }}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
