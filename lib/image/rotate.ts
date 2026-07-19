import { RotateSettings, ImageProcessingResult, ProcessImageParams } from "./types";
import { initializeSharp, getMetadata } from "./sharp";

export async function processRotate(params: ProcessImageParams<RotateSettings>): Promise<ImageProcessingResult> {
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

  // Apply flip
  if (settings.flip === "horizontal") {
    sharpInstance = sharpInstance.flop();
  } else if (settings.flip === "vertical") {
    sharpInstance = sharpInstance.flip();
  }

  // Apply rotate
  const bg = settings.background === "transparent" ? { r: 0, g: 0, b: 0, alpha: 0 } : settings.background;
  sharpInstance = sharpInstance.rotate(settings.angle, { background: bg || { r: 0, g: 0, b: 0, alpha: 0 } });

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
  const filename = `${nameWithoutExt}-rotated.${outputFormat === "jpeg" ? "jpg" : outputFormat}`;

  return {
    buffer: outputBuffer,
    width: metadata.width || 0,
    height: metadata.height || 0,
    outputFormat,
    filename,
  };
}
