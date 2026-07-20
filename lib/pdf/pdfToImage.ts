import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import { PdfToImageServiceFactory, PdfToImageOptions } from "./services/pdf-to-image";
import { parsePageRanges } from "./utils";

export async function convertPdfToImagesZip(
  file: File,
  options: Omit<PdfToImageOptions, "pages"> & { pageSelection: "all" | "current" | "custom", customRange: string }
): Promise<{ zipBuffer: Uint8Array, imageCount: number }> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Need to determine the actual pages to render
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();

  let pagesToRender: number[] = [];

  if (options.pageSelection === "all") {
    pagesToRender = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (options.pageSelection === "current") {
    pagesToRender = [1]; // For simplicity, "current" implies page 1 if not passed explicitly, or we default to 1.
  } else if (options.pageSelection === "custom") {
    pagesToRender = parsePageRanges(options.customRange, totalPages);
  }

  // Deduplicate and sort
  pagesToRender = Array.from(new Set(pagesToRender)).sort((a, b) => a - b);

  if (pagesToRender.length === 0) {
    throw new Error("No valid pages selected for conversion.");
  }

  const service = PdfToImageServiceFactory.getService();
  const images = await service.convert(arrayBuffer, {
    format: options.format,
    quality: options.quality,
    dpi: options.dpi,
    pages: pagesToRender
  });

  // Create ZIP archive
  const zip = new JSZip();
  
  images.forEach(img => {
    zip.file(img.filename, img.buffer);
  });

  const zipBuffer = await zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: {
      level: 5
    }
  });

  return { zipBuffer, imageCount: images.length };
}
