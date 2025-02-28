"use client";

import { useState, useEffect } from "react";
import { Minus, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Schema } from "amplify/data/resource";
import ExperienceUpdateForm from "ui-components/ExperienceUpdateForm";
import ExperienceCreateForm from "ui-components/ExperienceCreateForm";
import { generateClient } from "aws-amplify/data";
import ProfileSelector from "./ProfileSelector";

const client = generateClient<Schema>();

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

interface ExperiencesProps {
  selectedProfile: Schema["Profile"]["type"] | null;
}

export default function Experiences({ selectedProfile }: ExperiencesProps) {
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(
    new Set()
  );
  const [experiences, setExperiences] = useState<
    Schema["Experience"]["type"][]
  >([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  async function deleteExperience(id: string) {
    try {
      const deletedExperience = await client.models.Experience.delete({ id });
      return deletedExperience;
    } catch (error) {
      console.error("Failed to delete experience:", error);
      return null;
    }
  }

  useEffect(() => {
    if (!selectedProfile) return;
    const sub = client.models.Experience.observeQuery({
      filter: { profileId: { eq: selectedProfile.id } },
    }).subscribe({
      next: ({ items }) => {
        setExperiences([...items]);
      },
    });
    return () => sub.unsubscribe();
  }, [selectedProfile]);

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((item) => item.id !== id));
    setExpandedExperiences((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    deleteExperience(id);
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
          Experiences
        </h2>
        {/* Optionally, you could also use ProfileSelector here if needed */}
      </div>

      {!selectedProfile && (
        <p className="text-muted-foreground mb-4">
          Please select a profile to view experiences.
        </p>
      )}

      <div className="flex flex-col gap-3 my-4">
        {experiences.length === 0 && selectedProfile && (
          <p className="text-muted-foreground text-sm italic">
            No experiences added yet. Add your first experience below.
          </p>
        )}

        {experiences.map((item) => (
          <Card key={item.id} className="w-lg overflow-hidden">
            <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1 pr-2">
                  <CardTitle className="text-base font-medium">
                    {item.job_title && <span>{item.job_title}</span>}
                    {item.company_name && (
                      <span className="ml-1">at {item.company_name}</span>
                    )}
                  </CardTitle>
                  {(item.start_date || item.end_date) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.start_date ? formatDate(item.start_date) : ""}
                      {item.start_date && item.end_date ? " - " : ""}
                      {item.end_date ? formatDate(item.end_date) : "Present"}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 self-end sm:self-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={expandedExperiences.has(item.id)}
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
                    className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    onClick={() => handleDelete(item.id)}
                    aria-label="Delete experience"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedExperiences.has(item.id) && (
              <CardContent className="px-4 pb-4 pt-0 sm:px-6">
                <div className="border-t pt-3">
                  <div className="max-h-[70vh] overflow-y-auto">
                    <ExperienceUpdateForm
                      experience={item}
                      onSubmit={(fields) => {
                        toggleExpand(item.id);
                        return fields;
                      }}
                    />
                  </div>
                </div>
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
          aria-expanded={showCreateForm}
        >
          {showCreateForm ? "Cancel" : "Add New Experience"}
          {showCreateForm ? (
            <Minus className="h-4 w-4 ml-2" />
          ) : (
            <Plus className="h-4 w-4 ml-2" />
          )}
        </Button>

        {showCreateForm && (
          <Card className="mt-4 p-4 sm:p-6">
            <div className="max-h-[80vh] overflow-y-auto">
              <ExperienceCreateForm
                onSubmit={(fields) => {
                  setShowCreateForm(false);
                  const updatedFields = {
                    ...fields,
                    profileId: selectedProfile?.id,
                  };
                  return updatedFields;
                }}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
