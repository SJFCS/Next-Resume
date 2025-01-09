"use client";

import { Editor } from "@monaco-editor/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileEdit, Download, WrapText } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface YamlEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function YamlEditor({ content, onChange }: YamlEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [wordWrap, setWordWrap] = useState<"off" | "on">("off");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "next-resume.yaml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleWordWrap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setWordWrap(prev => prev === "on" ? "off" : "on");
  };

  // 确保在客户端渲染前使用默认主题
  const currentTheme = mounted ? resolvedTheme : "light";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-40 right-4 rounded-full bg-primary p-2 text-primary-foreground shadow-lg hover:opacity-90 no-print">
          <FileEdit className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl h-[80vh] bg-background border-border/50"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle>编辑简历</DialogTitle>
          <DialogDescription>
            在这里您可以使用YAML格式编辑您的简历内容。支持实时预览和语法高亮。
          </DialogDescription>
        </DialogHeader>
        <div id="dialog-description" className="sr-only">
          使用YAML格式编辑您的简历内容。编辑器支持语法高亮和自动补全功能。
        </div>
        <div className="flex-1 min-h-0 rounded-md overflow-hidden border border-border/50 relative">
          {mounted && (
            <>
              <button
                onClick={toggleWordWrap}
                onTouchEnd={toggleWordWrap}
                className={cn(
                  "absolute top-2 right-[20px] z-10 p-1.5 rounded select-none",
                  "transition-all duration-200",
                  "border border-border/50",
                  "text-muted-foreground bg-white/80 dark:bg-white/5",
                  "hover:bg-white/90 dark:hover:bg-white/10 hover:text-foreground",
                  wordWrap === "on" && [
                    "text-accent-foreground",
                    "bg-accent hover:bg-accent/90",
                    "border-accent",
                    "shadow-sm"
                  ]
                )}
                title={`自动换行：${wordWrap === "on" ? "开启" : "关闭"}`}
                aria-pressed={wordWrap === "on"}
              >
                <WrapText className="h-4 w-4" />
              </button>
              <Editor
                height="60vh"
                defaultLanguage="yaml"
                value={content}
                onChange={(value) => onChange(value || "")}
                theme={currentTheme === "dark" ? "vs-dark" : "light"}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: wordWrap,
                  tabSize: 2,
                }}
                onMount={(editor) => {
                  editor.updateOptions({ wordWrap });
                }}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            下载 YAML
          </Button>
          <Button
            size="lg"
            onClick={() => setIsOpen(false)}
            className="min-w-[100px]"
          >
            关闭
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
