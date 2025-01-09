"use client";
// 网格背景
export function ThemeStyles() {
  return (
    <style jsx global>{`
      :root {
        --card-rgb: 255, 255, 255;
        --grid-rgb: 0, 0, 0;
      }
      .dark {
        --card-rgb: 20, 20, 20;
        --grid-rgb: 255, 255, 255;
      }
    `}</style>
  );
}
