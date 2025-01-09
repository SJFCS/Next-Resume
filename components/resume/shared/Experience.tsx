"use client";

import { ExperienceItem } from "@/types/resume";
import { BulletList } from "./BulletList";
import { ListItem } from "../types";
import { ImagePreview } from "./ImagePreview";

interface ExperienceProps {
  item: ExperienceItem;
}

export function Experience({ item }: ExperienceProps) {
  const bulletItems: ListItem[] = (item.items || []).map((content) => {
    if (Array.isArray(content)) {
      return { content: content[0], isSubItem: true };
    }
    return { content };
  });

  return (
    <div className="mb-4">
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-2">
              {item.image ? (
                <div className="flex-shrink-0">
                  <ImagePreview
                    title={item.title}
                    image={item.image}
                    url={item.url}
                  />
                </div>
              ) : (
                <h3 className="text-lg font-semibold">{item.title}</h3>
              )}
              {item.subtitle && (
                <div className="flex items-baseline gap-2">
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{item.subtitle}</span>
                </div>
              )}
            </div>
          </div>
          {item.date && (
            <div className="text-sm text-muted-foreground whitespace-nowrap basis-full sm:basis-auto">
              {item.date}
            </div>
          )}
        </div>
        {item.description && (
          <div 
            className="text-base"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
      </div>
      {bulletItems.length > 0 && <BulletList items={bulletItems} />}
    </div>
  );
}
