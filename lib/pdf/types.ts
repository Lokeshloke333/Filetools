export interface PdfFileInfo {
  file: File;
  id: string; // Unique ID for reordering list
  pageCount?: number;
  error?: string;
}

export interface PdfMergeResult {
  url: string;
  filename: string;
  originalSize: number;
  processedSize: number;
  totalPageCount: number;
}

export type PdfSplitMode = "every_page" | "ranges" | "extract";

export interface PdfSplitResult {
  url: string;
  filename: string;
  originalSize: number;
  processedSize: number;
  totalGeneratedFiles: number;
}

export type PdfCompressionLevel = "low" | "medium" | "high";

export interface PdfCompressResult {
  url: string;
  filename: string;
  originalSize: number;
  processedSize: number;
}

export interface PdfUnlockResult {
  url: string;
  filename: string;
  originalSize: number;
  processedSize: number;
}

