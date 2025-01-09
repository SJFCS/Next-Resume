import { Resume } from "@/components/resume/Resume";
import { getResumeData, getConfig } from "@/lib/resume";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const config = await getConfig();
    const accessCodes = new Set([
      'public',
      ...(config.accessCodes || [])
    ]);
    return Array.from(accessCodes).map((code) => ({
      code: code,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [{ code: "public" }];
  }
}

type PageProps = {
  params: Promise<{ code: string }>;
};

export default async function ResumePage({ params }: PageProps) {
  // 等待解析参数
  const { code } = await params;

  const config = await getConfig();
  const validCodes = new Set([
    'public',
    ...(config.accessCodes || [])
  ]);

  if (!validCodes.has(code)) {
    notFound();
  }

  const data = await getResumeData();
  return <Resume initialData={data} config={config} />;
}
