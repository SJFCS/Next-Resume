"use client";

import { Header } from "@/components/resume/sections/Header";
import { Section } from "@/components/resume/sections/Section";
import { ResumeData } from "@/types/resume";
import { ResumeConfig } from "@/types/config";
import { Printer, Github } from "lucide-react";
import { useResume } from "@/hooks/use-resume";
import { YamlEditor } from "../YamlEditor";

interface ResumeProps {
  initialData: ResumeData;
  config: ResumeConfig;
}

export function Resume({ initialData, config }: ResumeProps) {
  const { data, content, setContent } = useResume(initialData);

  return (
    <div className="min-h-screen bg-background grid-background">
      {/* 简历卡片宽度 */}
      <div className="mx-auto max-w-5xl p-8 xs:p-2">
        <div className="glass-card rounded-xl shadow-lg p-8 xs:p-3">
          <Header metadata={data.metadata} />
          {data.sections.map((section, index) => (
            <Section key={index} section={section} />
          ))}
        </div>
        {/* 按钮间距相差 12 units */}
        {/* 打印屏蔽按钮 */}
        {!config.hideButtons && (
          <div>
            {/* GitHub 按钮 (bottom-16) */}
            <a
              href="https://github.com/SJFCS/Next-Resume"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-16 right-4 rounded-full bg-primary p-2 text-primary-foreground shadow-lg hover:opacity-90 no-print"
            >
              <Github className="h-5 w-5" />
            </a>
            {/* 编辑按钮 (bottom-40) */}
            <YamlEditor content={content} onChange={setContent} />
            {/* 打印按钮 (bottom-28) */}
            <button
              onClick={() => window.print()}
              className="fixed bottom-28 right-4 rounded-full bg-primary p-2 text-primary-foreground shadow-lg hover:opacity-90 no-print"
            >
              <Printer className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
