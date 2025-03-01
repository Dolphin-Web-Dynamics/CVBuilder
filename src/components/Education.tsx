// src/components/Education.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DegreeUpdateForm from "ui-components/DegreeUpdateForm";
import DegreeCreateForm from "ui-components/DegreeCreateForm";
import { useData } from "@/context/DataContext";

export default function Education() {
  const { degrees, selectedProfile, deleteDegree } = useData();
  const [expandedDegrees, setExpandedDegrees] = React.useState<Set<string>>(
    new Set()
  );
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  // Filter degrees based on the selected profile
  const filteredDegrees = selectedProfile
    ? degrees.filter((degree) => degree.profileId === selectedProfile.id)
    : [];

  const toggleExpand = (id: string) => {
    setExpandedDegrees((prev) => {
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
      <h2 className="text-xl font-bold mb-4">Education</h2>

      {!selectedProfile && (
        <p className="text-muted-foreground mb-4">
          Please select a profile to view education.
        </p>
      )}

      <div className="flex flex-col gap-3 my-4">
        {filteredDegrees.length === 0 && selectedProfile && (
          <p className="text-muted-foreground text-sm italic">
            No education records added yet. Add your first record below.
          </p>
        )}

        {filteredDegrees.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">
                    {item.degree} from {item.school_name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {item.start_date
                      ? new Date(item.start_date).toLocaleDateString()
                      : "Unknown"}{" "}
                    -{" "}
                    {item.end_date
                      ? new Date(item.end_date).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(item.id)}
                    aria-label={
                      expandedDegrees.has(item.id)
                        ? "Collapse details"
                        : "Expand details"
                    }
                  >
                    {expandedDegrees.has(item.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Delete education"
                    onClick={() => deleteDegree(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedDegrees.has(item.id) && (
              <CardContent className="px-4 pb-4 pt-0">
                <DegreeUpdateForm
                  degree={item}
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
          {showCreateForm ? "Cancel" : "Add New Education"}
          {showCreateForm ? (
            <Minus className="h-4 w-4 ml-2" />
          ) : (
            <Plus className="h-4 w-4 ml-2" />
          )}
        </Button>

        {showCreateForm && (
          <Card className="mt-4 p-4">
            <DegreeCreateForm
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
