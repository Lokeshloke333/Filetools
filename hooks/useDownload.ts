import { useCallback } from "react";
import { downloadFile } from "@/lib/utils/image";

export function useDownload() {
  const handleDownload = useCallback((url: string | undefined, filename: string | undefined) => {
    if (url && filename) {
      downloadFile(url, filename);
    }
  }, []);

  return { handleDownload };
}
