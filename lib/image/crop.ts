import { CropSettings, ImageProcessingResult, ProcessImageParams } from "./types";
import { initializeSharp, getMetadata } from "./sharp";

export async function processCrop(params: ProcessImageParams<CropSettings>): Promise<ImageProcessingResult> {
  const { buffer, mimeType, originalName, settings } = params;
  
  let sharpInstance = initializeSharp(buffer);
  sharpInstance = sharpInstance.withMetadata();

  let outputFormat = settings.format.toLowerCase();

  if (outputFormat === "original") {
    if (mimeType.includes("jpeg") || mimeType.includes("jpg")) outputFormat = "jpeg";
    else if (mimeType.includes("png")) outputFormat = "png";
    else if (mimeType.includes("webp")) outputFormat = "webp";
    else if (mimeType.includes("avif")) outputFormat = "avif";
    else outputFormat = "webp"; // fallback
  }
  if (outputFormat === "jpg") outputFormat = "jpeg";

  // Validate crop boundaries against original metadata to prevent out-of-bounds error
  const metadata = await getMetadata(buffer);
  const originalWidth = metadata.width || 0;
  const originalHeight = metadata.height || 0;

  // Math.round to ensure integers
  const left = Math.max(0, Math.round(settings.x));
  const top = Math.max(0, Math.round(settings.y));
  let cropWidth = Math.max(1, Math.round(settings.width));
  let cropHeight = Math.max(1, Math.round(settings.height));

  // Ensure crop box stays within image bounds
  if (left + cropWidth > originalWidth) {
    cropWidth = originalWidth - left;
  }
  if (top + cropHeight > originalHeight) {
    cropHeight = originalHeight - top;
  }

  // Apply crop
  if (cropWidth > 0 && cropHeight > 0) {
    sharpInstance = sharpInstance.extract({
      left,
      top,
      width: cropWidth,
      height: cropHeight,
    });
  }

  // Apply format
  switch (outputFormat) {
    case "jpeg":
    case "jpg":
      sharpInstance = sharpInstance.jpeg();
      break;
    case "png":
      sharpInstance = sharpInstance.png();
      break;
    case "webp":
      sharpInstance = sharpInstance.webp();
      break;
    case "avif":
      sharpInstance = sharpInstance.avif();
      break;
    default:
      sharpInstance = sharpInstance.webp();
      outputFormat = "webp";
  }

  const outputBuffer = await sharpInstance.toBuffer();
  
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
  const filename = `${nameWithoutExt}-cropped.${outputFormat === "jpeg" ? "jpg" : outputFormat}`;

  return {
    buffer: outputBuffer,
    width: cropWidth,
    height: cropHeight,
    outputFormat,
    filename,
  };
}
