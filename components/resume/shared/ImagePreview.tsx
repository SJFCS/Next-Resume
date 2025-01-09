"use client";

import * as React from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  title: string;
  image: string;
  url?: string;
}

const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] bg-background rounded-lg border-[1px] border-border !m-0 !p-2 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
CustomDialogContent.displayName = "CustomDialogContent";

export function ImagePreview({ title, image, url }: ImagePreviewProps) {
  const [isHoverCardOpen, setIsHoverCardOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 使用 onLoad 事件来处理图片加载
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  // 处理图片加载错误
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const ImagePlaceholder = () => (
    <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
  );

  return (
    <>
      <HoverCard
        open={isHoverCardOpen}
        onOpenChange={setIsHoverCardOpen}
        openDelay={0}
        closeDelay={150}
      >
        <div className="inline-flex items-center relative">
          {/* 触摸屏遮罩层 */}
          <div
            className="absolute inset-0 z-10 hidden touch-device:block"
            onClick={() => setIsDialogOpen(true)}
          />
          <HoverCardTrigger asChild>
            <h3
              className="inline text-lg font-semibold hover:text-primary/80 hover:transition-colors cursor-pointer touch-device:pointer-events-none"
              onClick={() => setIsDialogOpen(true)}
            >
              {title}
            </h3>
          </HoverCardTrigger>
        </div>
        <HoverCardContent
          className="w-[320px] p-2 border-[1px] border-border"
          align="start"
          side="top"
          // side="bottom" //TODO 控制缩略图在上方还是下方出现
          sideOffset={4}
          alignOffset={-8}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="relative aspect-video">
              {(!imageLoaded || imageError) && <ImagePlaceholder />}
              <Image
                src={
                  image.startsWith("http") ? image : image.replace(/^\//, "")
                }
                alt={title}
                width={240}
                height={135}
                className={cn(
                  "w-full h-full object-cover rounded-sm",
                  !imageLoaded || imageError ? "opacity-0" : "opacity-100"
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
                unoptimized
                priority
              />
            </div>
            {url && <ExternalLinkButton href={url} />}
          </div>
        </HoverCardContent>
      </HoverCard>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <CustomDialogContent>
          <DialogTitle className="sr-only">{title} 的图片预览</DialogTitle>
          <DialogDescription className="sr-only">
            点击图片外部区域或按下 Esc 键可关闭预览
          </DialogDescription>
          <div className="relative">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              {(!imageLoaded || imageError) && <ImagePlaceholder />}
              <Image
                src={
                  image.startsWith("http") ? image : image.replace(/^\//, "")
                }
                alt={title}
                width={1024}
                height={576}
                className={cn(
                  "w-full h-full object-cover",
                  !imageLoaded || imageError ? "opacity-0" : "opacity-100"
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
                unoptimized
              />
              {url && <ExternalLinkButton href={url} />}
            </div>
          </div>
        </CustomDialogContent>
      </Dialog>
    </>
  );
}

function ExternalLinkButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background/90"
      onClick={(e) => e.stopPropagation()}
    >
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
