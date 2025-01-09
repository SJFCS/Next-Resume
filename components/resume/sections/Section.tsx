"use client";

import { Section as SectionType } from "@/types/resume";
import { Experience } from "../shared/Experience";
import { Separator } from "@/components/ui/separator";

interface SectionProps {
  section: SectionType;
}

export function Section({ section }: SectionProps) {
  const items = section.experience || [];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold">{section.title}</h2>
      <Separator className="my-4" />
      <div className="space-y-6">
        {items.map((item, index) => (
          <Experience key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
