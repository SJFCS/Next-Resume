"use client";

import { ListItem } from "../types";

interface BulletListProps {
  items: ListItem[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="mt-2 space-y-1">
      {items.map((item, index) => (
        <li
          key={index}
          className={`relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.5em] before:w-2 before:h-2 before:bg-current before:rounded-full before:transform before:translate-y-[2px] ${
            item.isSubItem
              ? "ml-4 before:bg-transparent before:border before:border-current"
              : ""
          }`}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      ))}
    </ul>
  );
}
