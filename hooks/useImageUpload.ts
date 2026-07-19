import { useState, useCallback, useEffect } from "react";
import { validateImage } from "@/lib/utils/image";
import { toast } from "sonner";

export interface FileWithPreview extends File {
  preview: string;
}

export function useImageUpload() {
  const [file, setFile] = useState<FileWithPreview | null>(null);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const handleFileSelect = useCallback((selectedFile: File) => {
    const { valid, error } = validateImage(selectedFile);
    
    if (!valid) {
      toast.error(error || "Invalid file");
      return;
    }

    // Revoke previous preview if exists
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }

    // Create preview
    const preview = URL.createObjectURL(selectedFile);
    
    // Create new file object with preview
    const newFile = selectedFile as FileWithPreview;
    newFile.preview = preview;
    
    setFile(newFile);
  }, [file]);

  const clearFile = useCallback(() => {
    setFile(null);
  }, []);

  return {
    file,
    handleFileSelect,
    clearFile
  };
}
