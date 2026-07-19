import { ConvertSettings, ImageProcessingResult, ProcessImageParams } from "./types";
import { initializeSharp, getMetadata } from "./sharp";

export async function processConvert(params: ProcessImageParams<ConvertSettings>): Promise<ImageProcessingResult> {
  const { buffer, originalName, settings } = params;
  
  let sharpInstance = initializeSharp(buffer);
  
  if (!settings.stripMetadata) {
    sharpInstance = sharpInstance.withMetadata();
  }

  let outputFormat = settings.targetFormat.toLowerCase();
  if (outputFormat === "jpg") outputFormat = "jpeg";

  // Apply format and quality
  switch (outputFormat) {
    case "jpeg":
    case "jpg":
      sharpInstance = sharpInstance.jpeg({ quality: settings.quality });
      break;
    case "png":
      // PNG quality in sharp is handled by zlib compression level, but we can set quality for palette
      sharpInstance = sharpInstance.png({ quality: settings.quality });
      break;
    case "webp":
      sharpInstance = sharpInstance.webp({ quality: settings.quality });
      break;
    case "avif":
      sharpInstance = sharpInstance.avif({ quality: settings.quality });
      break;
    case "gif":
      sharpInstance = sharpInstance.gif();
      break;
    default:
      sharpInstance = sharpInstance.webp({ quality: settings.quality });
      outputFormat = "webp";
  }

  const outputBuffer = await sharpInstance.toBuffer();
  const metadata = await getMetadata(outputBuffer);
  
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
  const filename = `${nameWithoutExt}-converted.${outputFormat === "jpeg" ? "jpg" : outputFormat}`;

  return {
    buffer: outputBuffer,
    width: metadata.width || 0,
    height: metadata.height || 0,
    outputFormat,
    filename,
  };
}
