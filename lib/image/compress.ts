import { CompressSettings, ImageProcessingResult, ProcessImageParams } from "./types";
import { initializeSharp, getMetadata } from "./sharp";
import { applyMetadataHandling } from "./metadata";

export async function processCompress(params: ProcessImageParams<CompressSettings>): Promise<ImageProcessingResult> {
  const { buffer, mimeType, originalName, settings } = params;
  
  let sharpInstance = initializeSharp(buffer);
  sharpInstance = applyMetadataHandling(sharpInstance, settings.stripMetadata);

  let outputFormat = settings.format.toLowerCase();

  if (outputFormat === "original") {
    if (mimeType.includes("jpeg") || mimeType.includes("jpg")) outputFormat = "jpeg";
    else if (mimeType.includes("png")) outputFormat = "png";
    else if (mimeType.includes("webp")) outputFormat = "webp";
    else if (mimeType.includes("avif")) outputFormat = "avif";
    else outputFormat = "webp"; // fallback
  }

  if (outputFormat === "jpg") outputFormat = "jpeg";

  const { quality, progressive } = settings;

  switch (outputFormat) {
    case "jpeg":
    case "jpg":
      sharpInstance = sharpInstance.jpeg({ quality, progressive });
      break;
    case "png":
      sharpInstance = sharpInstance.png({ quality, progressive, compressionLevel: 9 });
      break;
    case "webp":
      sharpInstance = sharpInstance.webp({ quality });
      break;
    case "avif":
      sharpInstance = sharpInstance.avif({ quality });
      break;
    default:
      sharpInstance = sharpInstance.webp({ quality });
      outputFormat = "webp";
  }

  const outputBuffer = await sharpInstance.toBuffer();
  const metadata = await getMetadata(outputBuffer);
  
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
  const filename = `${nameWithoutExt}-compressed.${outputFormat === "jpeg" ? "jpg" : outputFormat}`;

  return {
    buffer: outputBuffer,
    width: metadata.width || 0,
    height: metadata.height || 0,
    outputFormat,
    filename,
  };
}
