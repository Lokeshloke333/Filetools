import { ResizeSettings, ImageProcessingResult, ProcessImageParams } from "./types";
import { initializeSharp, getMetadata } from "./sharp";

export async function processResize(params: ProcessImageParams<ResizeSettings>): Promise<ImageProcessingResult> {
  const { buffer, mimeType, originalName, settings } = params;
  
  let sharpInstance = initializeSharp(buffer);
  
  // By default, sharp keeps metadata unless asked to strip. We will just keep it.
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

  // Determine fit based on maintainAspectRatio and provided fit string
  let fitMode = settings.fit;
  if (!settings.maintainAspectRatio && settings.width && settings.height) {
    fitMode = "fill";
  }

  // Apply resize
  sharpInstance = sharpInstance.resize({
    width: settings.width || undefined,
    height: settings.height || undefined,
    fit: fitMode,
    withoutEnlargement: false, // Allow upscaling
  });

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
  const metadata = await getMetadata(outputBuffer);
  
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
  const filename = `${nameWithoutExt}-resized.${outputFormat === "jpeg" ? "jpg" : outputFormat}`;

  return {
    buffer: outputBuffer,
    width: metadata.width || 0,
    height: metadata.height || 0,
    outputFormat,
    filename,
  };
}
