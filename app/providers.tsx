"use client";
// 主题切换
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

interface ProvidersProps {
  children: React.ReactNode;
  theme: string;
}

export function Providers({ children, theme }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
      {children}
    </ThemeProvider>
  );
}
