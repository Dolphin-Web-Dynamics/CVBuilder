"use client";

import React, { useState, useEffect } from "react";
import { Minus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Schema } from "amplify/data/resource";
import ProfileUpdateForm from "ui-components/ProfileUpdateForm";
import ProfileCreateForm from "ui-components/ProfileCreateForm";
import { generateClient } from "aws-amplify/data";
import { PlusIcon } from "@heroicons/react/24/solid";

// Import social icons from react-icons
import { IconType } from "react-icons";
import { SiLinkedin, SiGithub, SiX, SiStackoverflow } from "react-icons/si";
import { Copy } from "lucide-react";

const client = generateClient<Schema>();

// Map social types to icon components
const socialIcons: Record<string, IconType> = {
  linkedin: SiLinkedin,
  github: SiGithub,
  x: SiX,
  stackoverflow: SiStackoverflow,
};

// A small component to render a single social icon.
interface SocialIconProps {
  type: string;
  url: string;
}
const SocialIcon: React.FC<SocialIconProps> = ({ type, url }) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = socialIcons[type.toLowerCase()];

  // When the copy button is clicked, copy the URL.
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from triggering the link action
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Clicking on the icon (outside the copy button) opens the URL.
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleClick}>
      {IconComponent ? (
        <IconComponent className="w-6 h-6 text-gray-600 hover:text-blue-600" />
      ) : (
        <span>{type}</span>
      )}
      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
        {copied ? "Copied!" : "Click to open, hover & click copy"}
      </div>
      {/* Copy button appears on hover */}
      <button
        onClick={handleCopy}
        className="absolute top-0 right-0 hidden group-hover:block bg-white border border-gray-300 rounded-full p-1"
      >
        <Copy className="w-3 h-3 text-gray-500" />
      </button>
    </div>
  );
};

export default function Profiles() {
  const [expandedProfiles, setExpandedProfiles] = useState<Set<string>>(
    new Set()
  );
  const [profiles, setProfiles] = useState<Schema["Profile"]["type"][]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  async function deleteProfile(id: string) {
    try {
      const deletedProfile = await client.models.Profile.delete({ id });
      return deletedProfile;
    } catch (error) {
      console.error("Failed to delete profile:", error);
      return null;
    }
  }

  useEffect(() => {
    const sub = client.models.Profile.observeQuery().subscribe({
      next: ({ items }) => {
        setProfiles([...items]);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const handleDelete = (id: string) => {
    setProfiles(profiles.filter((item) => item.id !== id));
    setExpandedProfiles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    deleteProfile(id);
  };

  const toggleExpand = (id: string) => {
    setExpandedProfiles((prev) => {
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
    <div className="w-full max-w-md space-y-4">
      {profiles.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              {/* Stylized title with name and social icons */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{item.name}</span>
                <div className="flex space-x-1">
                  {/* {item.socials((social) => (
                    <SocialIcon
                      key={social.type}
                      type={social.type}
                      url={social.url}
                    />
                  ))} */}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => toggleExpand(item.id)}
              >
                {expandedProfiles.has(item.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle expand</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleDelete(item.id)}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Delete item</span>
              </Button>
            </div>
          </CardHeader>
          {expandedProfiles.has(item.id) && (
            <CardContent>
              <ProfileUpdateForm
                profile={item}
                onSubmit={(fields) => {
                  toggleExpand(item.id);
                  return fields;
                }}
              />
            </CardContent>
          )}
        </Card>
      ))}

      <div>
        <Button
          aria-label={showCreateForm ? "Cancel" : "Add new profile"}
          onClick={() => setShowCreateForm((prev) => !prev)}
        >
          {showCreateForm ? "Cancel" : "Add New Profile"}
          <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true" />
        </Button>
        {showCreateForm && (
          <div className="mt-4">
            <ProfileCreateForm
              onSubmit={(fields) => {
                setShowCreateForm(false);
                return fields;
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
