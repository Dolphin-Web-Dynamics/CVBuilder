"use client";

import type React from "react";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { ResumeContext } from "@/context/ResumeContext";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import TemplateSelector from "./TemplateSelector";

interface SidebarPanelProps {
  className?: string;
  isMobile?: boolean;
}

export default function SidebarPanel({
  className,
  isMobile = false,
}: SidebarPanelProps) {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const [inputValue, setInputValue] = useState<string>(
    JSON.stringify(resumeData, null, 2)
  );
  const [hasEdited, setHasEdited] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [imageSize, setImageSize] = useState<number>(80);

  useEffect(() => {
    if (!hasEdited) {
      setInputValue(JSON.stringify(resumeData, null, 2));
    }
  }, [resumeData, hasEdited]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let jsonString = inputValue;

      const lines = jsonString.split("\n");
      if (
        lines.length > 1 &&
        lines[0].trim().startsWith("```json") &&
        lines[lines.length - 1].trim() === "```"
      ) {
        lines.shift();
        lines.pop();
        jsonString = lines.join("\n");
      }

      try {
        const parsedData = JSON.parse(jsonString);
        setResumeData((prevData) => ({
          ...prevData,
          ...parsedData,
        }));
        setIsValid(true);
        setError("");
      } catch {
        setIsValid(false);
        setError("Invalid JSON. Please check your syntax.");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, setResumeData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasEdited(true);
    setInputValue(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setResumeData({
        ...resumeData,
        candidate_image: fileUrl,
      });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setImageSize(newSize);
    setResumeData({
      ...resumeData,
      candidate_image_size: newSize,
    });
  };

  const templatesWithPicture = ["custom"];

  const renderSection = (title: string, content: React.ReactNode) => (
    <section
      className={`bg-white p-4 rounded-md shadow ${isMobile ? "mb-4" : ""}`}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {content}
    </section>
  );

  return (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      {renderSection(
        "Paste Job JSON Data",
        <>
          <div className="mb-4 text-center">
            <a
              href="https://chatgpt.com/g/g-67a3dfc519888191966a72e6d8e35b62-resume-builder-dwd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Click here to obtain your JSON from a GPT
            </a>
          </div>
          <textarea
            id="json-input"
            name="json-input"
            value={inputValue}
            onChange={handleInputChange}
            rows={isMobile ? 10 : 15}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <div className="mt-2 flex items-center">
            {isValid ? (
              <div className="text-green-600 flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-1" />
                <span>Valid JSON! Ready to generate resume.</span>
              </div>
            ) : (
              <div className="text-red-600 flex items-center">
                <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </>
      )}

      {templatesWithPicture.includes(resumeData.selectedTemplate ?? "") &&
        renderSection(
          "Profile Picture",
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="w-full mb-4 sm:mb-0 sm:mr-4">
                <label htmlFor="file-upload" className="block font-medium mb-2">
                  Upload Profile Picture
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              {previewUrl && (
                <div
                  className="relative"
                  style={{ width: imageSize, height: imageSize }}
                >
                  <Image
                    src={previewUrl || "/placeholder.svg"}
                    alt="Profile Preview"
                    width={imageSize}
                    height={imageSize}
                    className="rounded-full"
                    unoptimized={true}
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="image-size-slider"
                className="block text-sm font-medium mb-1"
              >
                Image Size: {imageSize}px
              </label>
              <input
                id="image-size-slider"
                type="range"
                min="50"
                max="200"
                value={imageSize}
                onChange={handleSliderChange}
                className="w-full"
              />
            </div>
          </>
        )}

      {renderSection(
        "Resume Margin (in inches)",
        <div className="flex items-center">
          <input
            id="resume-margin-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={resumeData.resumeMargin || 0.1}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                resumeMargin: Number.parseFloat(e.target.value),
              })
            }
            className="w-full"
          />
          <input
            type="number"
            step="0.01"
            min="0"
            max="0.5"
            value={resumeData.resumeMargin || 0.0}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                resumeMargin: Number.parseFloat(e.target.value),
              })
            }
            className="w-16 ml-4 border border-gray-300 rounded-md p-1"
          />
        </div>
      )}

      {renderSection("Template", <TemplateSelector />)}
    </div>
  );
}
