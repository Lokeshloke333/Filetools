import { PdfFileInfo } from "./types";
import { FILE_LIMITS } from "../config";

export function validatePdf(
  file: File, 
  existingFiles: PdfFileInfo[], 
  maxSizeMB: number = FILE_LIMITS.PDF_MAX_SIZE_MB
): { valid: boolean; error?: string } {
  // Check duplicates
  const isDuplicate = existingFiles.some(
    (f) => f.file.name === file.name && f.file.size === file.size
  );
  if (isDuplicate) {
    return { valid: false, error: "This file has already been added." };
  }

  // Check size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit.` };
  }

  // Check type
  if (file.type !== "application/pdf") {
    return { valid: false, error: "Invalid file format. Please upload PDF files only." };
  }

  return { valid: true };
}
