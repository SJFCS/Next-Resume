"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [accessCode, setAccessCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim()) {
      router.push(`/${accessCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-background grid-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            持续进步·创造价值
          </h1>
          <p className="text-muted-foreground">Welcome to my resume portal</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="请输入访问码"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">访问</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
