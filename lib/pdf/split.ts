import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

// Helper to parse "1-5, 6-10" into arrays of ranges: [[1, 5], [6, 10]]
export function parseRanges(rangeStr: string, totalPages: number): [number, number][] {
  const parts = rangeStr.split(',').map(s => s.trim()).filter(Boolean);
  const ranges: [number, number][] = [];

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (isNaN(start) || isNaN(end) || start < 1 || end > totalPages || start > end) {
        throw new Error(`Invalid range: ${part}`);
      }
      ranges.push([start, end]);
    } else {
      const num = Number(part);
      if (isNaN(num) || num < 1 || num > totalPages) {
        throw new Error(`Invalid page number: ${part}`);
      }
      ranges.push([num, num]);
    }
  }
  return ranges;
}

// Helper to parse "1,3,5" into array of page numbers: [1, 3, 5]
export function parseExtractPages(pagesStr: string, totalPages: number): number[] {
  const parts = pagesStr.split(',').map(s => s.trim()).filter(Boolean);
  const pages: number[] = [];
  for (const part of parts) {
    const num = Number(part);
    if (isNaN(num) || num < 1 || num > totalPages) {
      throw new Error(`Invalid page number: ${part}`);
    }
    pages.push(num);
  }
  return pages;
}

export async function splitPdf(
  file: File, 
  mode: "every_page" | "ranges" | "extract", 
  rangesStr?: string, 
  extractStr?: string
): Promise<{ zipBytes: Uint8Array, fileCount: number }> {
  
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();
  const zip = new JSZip();
  let fileCount = 0;

  const baseName = file.name.replace(/\.[^/.]+$/, "");

  if (mode === "every_page") {
    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);
      const pdfBytes = await newPdf.save();
      zip.file(`${baseName}_page_${i + 1}.pdf`, pdfBytes);
      fileCount++;
    }
  } else if (mode === "ranges" && rangesStr) {
    const ranges = parseRanges(rangesStr, totalPages);
    for (const [start, end] of ranges) {
      const newPdf = await PDFDocument.create();
      const pageIndices = Array.from({ length: end - start + 1 }, (_, k) => start - 1 + k);
      const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
      copiedPages.forEach(p => newPdf.addPage(p));
      const pdfBytes = await newPdf.save();
      zip.file(`${baseName}_pages_${start}-${end}.pdf`, pdfBytes);
      fileCount++;
    }
  } else if (mode === "extract" && extractStr) {
    const pages = parseExtractPages(extractStr, totalPages);
    const newPdf = await PDFDocument.create();
    const pageIndices = pages.map(p => p - 1);
    const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
    copiedPages.forEach(p => newPdf.addPage(p));
    const pdfBytes = await newPdf.save();
    zip.file(`${baseName}_extracted.pdf`, pdfBytes);
    fileCount = 1; // It creates a single PDF with all extracted pages
  } else {
    throw new Error("Invalid split configuration");
  }

  const zipContent = await zip.generateAsync({ type: "uint8array" });
  return { zipBytes: zipContent, fileCount };
}
