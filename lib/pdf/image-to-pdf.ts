import { PDFDocument, rgb } from "pdf-lib";
import sharp from "sharp";

export interface ImageToPdfOptions {
  pageSize: "A4" | "Letter" | "Legal" | "A3";
  orientation: "portrait" | "landscape";
  margins: "none" | "small" | "medium" | "large";
  imageFit: "fit" | "fill" | "original";
}

const PAGE_SIZES = {
  A4: [595.28, 841.89],
  Letter: [612.00, 792.00],
  Legal: [612.00, 1008.00],
  A3: [841.89, 1190.55],
};

const MARGIN_SIZES = {
  none: 0,
  small: 20,
  medium: 40,
  large: 72,
};

export async function convertImagesToPdf(
  files: File[],
  options: ImageToPdfOptions
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  // Get base dimensions
  const baseSize = PAGE_SIZES[options.pageSize];
  const isLandscape = options.orientation === "landscape";
  const pageWidth = isLandscape ? baseSize[1] : baseSize[0];
  const pageHeight = isLandscape ? baseSize[0] : baseSize[1];
  const margin = MARGIN_SIZES[options.margins];

  const availableWidth = pageWidth - margin * 2;
  const availableHeight = pageHeight - margin * 2;

  for (const file of files) {
    let arrayBuffer = await file.arrayBuffer();
    const type = file.type;
    
    // Convert WEBP, AVIF, GIF, etc. to JPG using sharp
    if (type !== "image/jpeg" && type !== "image/png") {
      const buffer = Buffer.from(arrayBuffer);
      arrayBuffer = (await sharp(buffer).jpeg({ quality: 90 }).toBuffer()) as any;
    }

    let pdfImage;
    try {
      // Try embedding as JPG first
      pdfImage = await pdfDoc.embedJpg(arrayBuffer);
    } catch (e) {
      // If it fails, try PNG
      pdfImage = await pdfDoc.embedPng(arrayBuffer);
    }

    const imgDims = pdfImage.scale(1);
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    let drawWidth = imgDims.width;
    let drawHeight = imgDims.height;
    let drawX = margin;
    let drawY = margin;

    if (options.imageFit === "fit") {
      const scale = Math.min(
        availableWidth / imgDims.width,
        availableHeight / imgDims.height
      );
      drawWidth = imgDims.width * scale;
      drawHeight = imgDims.height * scale;
      drawX = margin + (availableWidth - drawWidth) / 2;
      drawY = margin + (availableHeight - drawHeight) / 2;
    } else if (options.imageFit === "fill") {
      const scale = Math.max(
        availableWidth / imgDims.width,
        availableHeight / imgDims.height
      );
      drawWidth = imgDims.width * scale;
      drawHeight = imgDims.height * scale;
      drawX = margin + (availableWidth - drawWidth) / 2;
      drawY = margin + (availableHeight - drawHeight) / 2;
    } else if (options.imageFit === "original") {
      drawX = margin + (availableWidth - drawWidth) / 2;
      drawY = margin + (availableHeight - drawHeight) / 2;
    }

    page.drawImage(pdfImage, {
      x: drawX,
      y: drawY,
      width: drawWidth,
      height: drawHeight,
    });

    // Mask for 'fill' and 'original' if they bleed into margins
    if (margin > 0 && (options.imageFit === "fill" || options.imageFit === "original")) {
      const bgColor = rgb(1, 1, 1);
      // Top margin
      page.drawRectangle({ x: 0, y: pageHeight - margin, width: pageWidth, height: margin, color: bgColor });
      // Bottom margin
      page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: margin, color: bgColor });
      // Left margin
      page.drawRectangle({ x: 0, y: margin, width: margin, height: pageHeight - 2 * margin, color: bgColor });
      // Right margin
      page.drawRectangle({ x: pageWidth - margin, y: margin, width: margin, height: pageHeight - 2 * margin, color: bgColor });
    }
  }

  return await pdfDoc.save();
}
