import { ImageIcon, FileText, Video, Headphones, Sparkles, Wrench } from "lucide-react";

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

export const navigationData: Category[] = [
  {
    title: "Image Tools",
    icon: ImageIcon,
    items: [
      { label: "Compress Image", href: "/tools/image/compress" },
      { label: "Resize Image", href: "/tools/image/resize" },
      { label: "Crop Image", href: "/tools/image/crop" },
      { label: "Rotate Image", href: "/tools/image/rotate" },
      { label: "Convert Image", href: "/tools/image/convert" },
    ],
  },
  {
    title: "PDF Tools",
    icon: FileText,
    items: [
      { label: "Compress PDF", href: "/tools/pdf/compress" },
      { label: "Merge PDF", href: "/tools/pdf/merge" },
      { label: "Split PDF", href: "/tools/pdf/split" },
      { label: "JPG to PDF", href: "/tools/pdf/jpg-to-pdf" },
      { label: "PDF to JPG", href: "/tools/pdf/pdf-to-jpg" },
    ],
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
