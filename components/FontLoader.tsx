"use client";

import { useEffect } from "react";

interface FontLoaderProps {
  font: string;
}

export function FontLoader({ font }: FontLoaderProps) {
  useEffect(() => {
    // 如果字体名称为空或者是系统默认字体，就不加载 Google Fonts
    if (!font || font === "system-ui" || font === "sans-serif") {
      return;
    }

    // Set font from config
    document.documentElement.style.setProperty("--font-family", font);
    document.body.style.fontFamily = `"${font}", system-ui, -apple-system, sans-serif`;

    // Load Google Font
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font).replace(/%20/g, '+')}:wght@400;500;700&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [font]);

  return null;
}
