import { LucideIcon } from "lucide-react";

export interface MetadataItem {
  icon: LucideIcon;
  content: string;
  href?: string;
}

export interface ListItem {
  content: string;
  isSubItem?: boolean;
}