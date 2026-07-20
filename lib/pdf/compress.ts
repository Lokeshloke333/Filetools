import { PdfCompressionLevel } from "./types";
import { CompressionServiceFactory } from "./services/compressor";

/**
 * Entry point for compressing a PDF file.
 * 
 * This delegates to a modular compression service to allow easily integrating 
 * Ghostscript, qpdf, or an external API in the future without changing the frontend or API contract.
 */
export async function compressPdf(
  file: File, 
  level: PdfCompressionLevel
): Promise<Uint8Array> {
  const compressionService = CompressionServiceFactory.getService();
  return compressionService.compress(file, { level });
}
