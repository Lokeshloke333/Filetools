import { FILE_LIMITS } from "@/lib/config";

export interface WordToPdfOptions {
  pageSize?: "A4" | "Letter";
  orientation?: "portrait" | "landscape";
  margins?: "normal" | "compact" | "wide";
}

/**
 * Validates whether a file is a Word document (.docx or .doc)
 */
export function validateWordFile(file: File): { valid: boolean; error?: string } {
  const allowedExtensions = [".docx", ".doc"];
  const allowedMimeTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  const isValidExt = allowedExtensions.includes(ext);
  const isValidMime = allowedMimeTypes.includes(file.type) || file.type === "";

  if (!isValidExt && !isValidMime) {
    return {
      valid: false,
      error: "Only .docx and .doc Word documents are supported.",
    };
  }

  const MAX_SIZE_BYTES = FILE_LIMITS.WORD_MAX_SIZE_MB * 1024 * 1024;
  if (file.size > MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds maximum limit of ${FILE_LIMITS.WORD_MAX_SIZE_MB}MB.`,
    };
  }

  return { valid: true };
}
