"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = (e: React.MouseEvent) => {
    // 阻止事件冒泡，这样点击按钮不会触发 HoverCard 的关闭
    e.stopPropagation();
    setTheme(theme === "light" ? "dark" : "light");
  };

  const Icon = theme === "system" ? Monitor : theme === "dark" ? Moon : Sun;

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <button
          onClick={handleClick}
          className="fixed bottom-4 right-4 rounded-full bg-primary p-2 text-primary-foreground shadow-lg hover:opacity-90"
        >
          <Icon className="h-5 w-5" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        side="left"
        sideOffset={16}
        className="w-32 p-2"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <button
          className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 ${
            theme === "light" ? "bg-accent" : "hover:bg-accent"
          }`}
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4" />
          <span>浅色</span>
        </button>
        <button
          className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 ${
            theme === "dark" ? "bg-accent" : "hover:bg-accent"
          }`}
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4" />
          <span>深色</span>
        </button>
        <button
          className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 ${
            theme === "system" ? "bg-accent" : "hover:bg-accent"
          }`}
          onClick={() => setTheme("system")}
        >
          <Monitor className="h-4 w-4" />
          <span>跟随系统</span>
        </button>
      </HoverCardContent>
    </HoverCard>
  );
}
