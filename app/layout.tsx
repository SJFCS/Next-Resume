import "./globals.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/resume/shared/ThemeToggle";
import { ThemeStyles } from "@/components/resume/shared/ThemeStyles";
import { FontLoader } from "@/components/FontLoader";
import { getConfig } from "@/lib/resume";

export const metadata: Metadata = {
  title: "简历",
  description: "个人简历",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getConfig();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head />
      <body>
        <ThemeStyles />
        <Providers theme={config.theme}>
          <FontLoader font={config.font} />
          {children}
          {!config.hideButtons && <ThemeToggle />}
        </Providers>
      </body>
    </html>
  );
}
