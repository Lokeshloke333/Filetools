import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import mammoth from "mammoth";
import fs from "fs/promises";
import path from "path";

import { WordToPdfOptions, validateWordFile } from "./word-to-pdf.validation";

export { validateWordFile };
export type { WordToPdfOptions };

/**
 * Converts Word files (.docx / .doc) to PDF bytes
 */
export async function convertWordToPdf(
  files: File[],
  options: WordToPdfOptions = {}
): Promise<{ pdfBytes: Uint8Array; pageCount: number }> {
  const pdfDoc = await PDFDocument.create();
  
  // Register fontkit to support custom TrueType/OpenType fonts
  pdfDoc.registerFontkit(fontkit);

  // Load Unicode fonts (Roboto from cdnjs, validated as true TTF format)
  const regularFontBytes = await fs.readFile(path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf"));
  const boldFontBytes = await fs.readFile(path.join(process.cwd(), "public/fonts/Roboto-Medium.ttf"));
  const italicFontBytes = await fs.readFile(path.join(process.cwd(), "public/fonts/Roboto-Italic.ttf"));

  const font = await pdfDoc.embedFont(regularFontBytes);
  const fontBold = await pdfDoc.embedFont(boldFontBytes);
  const fontOblique = await pdfDoc.embedFont(italicFontBytes);

  // Page dimensions
  const isA4 = (options.pageSize || "A4") === "A4";
  const isLandscape = (options.orientation || "portrait") === "landscape";

  let pageW = isA4 ? 595.28 : 612;
  let pageH = isA4 ? 841.89 : 792;

  if (isLandscape) {
    const temp = pageW;
    pageW = pageH;
    pageH = temp;
  }

  // Margin sizes (points)
  const marginSizeMap = {
    normal: 50,
    compact: 30,
    wide: 70,
  };
  const margin = marginSizeMap[options.margins || "normal"];

  const contentW = pageW - margin * 2;
  const contentH = pageH - margin * 2;

  for (let fIdx = 0; fIdx < files.length; fIdx++) {
    const file = files[fIdx];
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let htmlResult = "";
    let extractedText = "";

    try {
      const result = await mammoth.convertToHtml({ buffer });
      htmlResult = result.value;
      const rawTextResult = await mammoth.extractRawText({ buffer });
      extractedText = rawTextResult.value;
    } catch (err) {
      console.warn(`Mammoth extraction error for ${file.name}, using raw text fallback:`, err);
      extractedText = `Document: ${file.name}\n\nCould not extract full formatting.`;
    }

    // Split document into lines & paragraphs
    const paragraphs = (extractedText || htmlResult)
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    let currentPage = pdfDoc.addPage([pageW, pageH]);
    let currentY = pageH - margin;

    // Helper: Add Header
    const drawHeader = () => {
      currentPage.drawText(file.name.replace(/\.[^/.]+$/, ""), {
        x: margin,
        y: pageH - 30,
        size: 9,
        font: fontOblique,
        color: rgb(0.4, 0.4, 0.4),
      });
      currentPage.drawLine({
        start: { x: margin, y: pageH - 35 },
        end: { x: pageW - margin, y: pageH - 35 },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });
    };

    // Helper: Add Footer
    const drawFooter = (pageNum: number) => {
      currentPage.drawLine({
        start: { x: margin, y: 40 },
        end: { x: pageW - margin, y: 40 },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });
      currentPage.drawText(`Page ${pageNum}`, {
        x: pageW - margin - 35,
        y: 25,
        size: 9,
        font: fontOblique,
        color: rgb(0.5, 0.5, 0.5),
      });
      currentPage.drawText("Converted with Fileinator", {
        x: margin,
        y: 25,
        size: 9,
        font,
        color: rgb(0.5, 0.5, 0.5),
      });
    };

    let pageNumInDoc = 1;
    drawHeader();

    if (paragraphs.length === 0) {
      currentPage.drawText(`[Empty Document: ${file.name}]`, {
        x: margin,
        y: currentY - 20,
        size: 12,
        font: fontOblique,
        color: rgb(0.5, 0.5, 0.5),
      });
      drawFooter(pageNumInDoc);
      continue;
    }

    for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
      const pText = paragraphs[pIdx];

      // Determine styling (Heading vs standard paragraph)
      const isHeading = pText.length < 80 && (pIdx === 0 || pText.toUpperCase() === pText || pText.endsWith(":"));
      const fontSize = isHeading ? 14 : 11;
      const lineHeight = fontSize * 1.4;
      const currentFont = isHeading ? fontBold : font;
      const fontColor = isHeading ? rgb(0.1, 0.2, 0.4) : rgb(0.15, 0.15, 0.15);

      // Word wrapping logic
      const words = pText.split(" ");
      let currentLine = "";
      const lines: string[] = [];

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = currentFont.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > contentW) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      // Check remaining page space
      const blockHeight = lines.length * lineHeight + (isHeading ? 16 : 10);
      if (currentY - blockHeight < margin + 40) {
        drawFooter(pageNumInDoc++);
        currentPage = pdfDoc.addPage([pageW, pageH]);
        currentY = pageH - margin - 15;
        drawHeader();
      }

      if (isHeading) {
        currentY -= 6;
      }

      for (const line of lines) {
        currentPage.drawText(line, {
          x: margin,
          y: currentY,
          size: fontSize,
          font: currentFont,
          color: fontColor,
        });
        currentY -= lineHeight;
      }

      currentY -= 8; // Spacing after paragraph
    }

    drawFooter(pageNumInDoc);
  }

  const pdfBytes = await pdfDoc.save();
  const pageCount = pdfDoc.getPageCount();
  return { pdfBytes, pageCount };
}
