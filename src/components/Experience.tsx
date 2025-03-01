"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceUpdateForm from "ui-components/ExperienceUpdateForm";
import ExperienceCreateForm from "ui-components/ExperienceCreateForm";
import { useData } from "@/context/DataContext";

export default function Experiences() {
  const { experiences, selectedProfile, deleteExperience } = useData();
  const [expandedExperiences, setExpandedExperiences] = React.useState<
    Set<string>
  >(new Set());
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  // Filter experiences based on the selected profile from the context.
  const filteredExperiences = selectedProfile
    ? experiences.filter((exp) => exp.profileId === selectedProfile.id)
    : [];

  const toggleExpand = (id: string) => {
    setExpandedExperiences((prev) => {
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
      <h2 className="text-xl font-bold mb-4">Experience</h2>

      {!selectedProfile && (
        <p className="text-muted-foreground mb-4">
          Please select a profile to view experiences.
        </p>
      )}

      <div className="flex flex-col gap-3 my-4">
        {filteredExperiences.length === 0 && selectedProfile && (
          <p className="text-muted-foreground text-sm italic">
            No experiences added yet. Add your first experience below.
          </p>
        )}

        {filteredExperiences.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="px-4 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  {item.job_title}{" "}
                  {item.company_name && `at ${item.company_name}`}
                </CardTitle>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(item.id)}
                    aria-label={
                      expandedExperiences.has(item.id)
                        ? "Collapse details"
                        : "Expand details"
                    }
                  >
                    {expandedExperiences.has(item.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Delete experience"
                    onClick={() => deleteExperience(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedExperiences.has(item.id) && (
              <CardContent className="px-4 pb-4 pt-0">
                <ExperienceUpdateForm
                  experience={item}
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
          {showCreateForm ? "Cancel" : "Add New Experience"}
          {showCreateForm ? (
            <Minus className="h-4 w-4 ml-2" />
          ) : (
            <Plus className="h-4 w-4 ml-2" />
          )}
        </Button>

        {showCreateForm && (
          <Card className="mt-4 p-4">
            <ExperienceCreateForm
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
