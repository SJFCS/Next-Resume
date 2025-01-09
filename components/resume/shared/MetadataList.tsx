"use client";

import { MetadataItem } from "../types";

interface MetadataListProps {
  items: MetadataItem[];
}

export function MetadataList({ items }: MetadataListProps) {
  return (
    <div className="mt-4 space-y-2">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
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
  );
}
