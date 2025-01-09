"use client";

import { ResumeData } from "@/types/resume";
import { useState, useEffect } from "react";
import yaml from "yaml";

export function useResume(initialData: ResumeData) {
  const [data, setData] = useState<ResumeData>(initialData);
  const [content, setContent] = useState(() => {
    return yaml.stringify(initialData);
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateUI = (newContent: string) => {
      try {
        const newData = yaml.parse(newContent) as ResumeData;
        setData(newData);
      } catch (error) {
        console.error('Failed to parse YAML:', error);
      }
    };

    const handleContentChange = (value: string) => {
      setContent(value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => updateUI(value), 500);
    };

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    data,
    content,
    setContent,
  };
}