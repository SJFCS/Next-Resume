"use client";

import { Metadata } from "@/types/resume";
import { Github, Globe, Mail, Phone, User } from "lucide-react";
import { MetadataItem } from "../types";
import Image from "next/image";

interface HeaderProps {
  metadata: Metadata;
}

export function Header({ metadata }: HeaderProps) {
  const metadataItems: MetadataItem[] = [
    metadata.age && {
      icon: User,
      content: `${metadata.age}岁`,
    },
    metadata.phone && {
      icon: Phone,
      content: metadata.phone,
    },
    metadata.email && {
      icon: Mail,
      content: metadata.email,
      href: `mailto:${metadata.email}`,
    },
    metadata.github && {
      icon: Github,
      content: `github.com/${metadata.github}`,
      href: `https://github.com/${metadata.github}`,
    },
    metadata.blog && {
      icon: Globe,
      content: metadata.blog,
      href: `https://${metadata.blog}`,
    },
  ].filter(Boolean) as MetadataItem[];

  const hasValidPhoto =
    metadata.photo && metadata.photo !== "none" && metadata.photo !== "";

  return (
    <header className="mb-8">
      <div
        className={`flex ${
          hasValidPhoto ? "justify-between" : "justify-center"
        } items-start gap-8`}
      >
        <div className={hasValidPhoto ? "" : "text-center"}>
          <h1 className="text-4xl font-bold">{metadata.name}</h1>
          <div className="mt-4 flex flex-wrap gap-4">
            {metadataItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <span>{item.content}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {hasValidPhoto && metadata.photo && metadata.name && (
          <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-full xs:hidden">
            <Image
              src={metadata.photo}
              alt={metadata.name}
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </header>
  );
}
