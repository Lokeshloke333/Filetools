import { ImageIcon, FileText, Video, Headphones, Sparkles, Wrench } from "lucide-react";
import { TOOLS } from "./tools";

export type ToolItem = {
  label: string;
  href: string;
  comingSoon?: boolean;
};

export type Category = {
  title: string;
  icon: React.ElementType;
  items: ToolItem[];
  comingSoon?: boolean;
};

// Dynamically fetch tools from the registry for the menu
const imageTools = TOOLS.filter(t => t.category === "Image").map(t => ({
  label: t.title,
  href: t.href,
  comingSoon: t.status === "coming-soon"
}));

const pdfTools = TOOLS.filter(t => t.category === "PDF").map(t => ({
  label: t.title,
  href: t.href,
  comingSoon: t.status === "coming-soon"
}));

export const navigationData: Category[] = [
  {
    title: "Image Tools",
    icon: ImageIcon,
    items: imageTools,
  },
  {
    title: "PDF Tools",
    icon: FileText,
    items: pdfTools,
  },
  {
    title: "Video Tools",
    icon: Video,
    comingSoon: true,
    items: [],
  },
  {
    title: "Audio Tools",
    icon: Headphones,
    comingSoon: true,
    items: [],
  },
  {
    title: "AI Tools",
    icon: Sparkles,
    comingSoon: true,
    items: [],
  },
  {
    title: "Utilities",
    icon: Wrench,
    comingSoon: true,
    items: [],
  },
];
