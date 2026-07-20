import { PDFDocument } from "pdf-lib";
import { PdfCompressionLevel } from "../types";

export interface CompressionOptions {
  level: PdfCompressionLevel;
}

export interface PdfCompressionService {
  compress(file: File, options: CompressionOptions): Promise<Uint8Array>;
}

export class PdfLibCompressionService implements PdfCompressionService {
  async compress(file: File, options: CompressionOptions): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    
    try {
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      // Configure compression settings based on requested level
      let useObjectStreams = true;
      
      if (options.level === "low") {
        useObjectStreams = false;
      } else if (options.level === "medium") {
        useObjectStreams = true;
      } else if (options.level === "high") {
        useObjectStreams = true;
      }

      // Save the PDF document (this occasionally strips unneeded data)
      const compressedBytes = await pdfDoc.save({ useObjectStreams });
      
      // If the "compressed" size is somehow larger, we just return the original bytes 
      // to avoid penalizing the user, since pdf-lib is not a true compression engine.
      if (compressedBytes.length > file.size) {
        return new Uint8Array(arrayBuffer);
      }
      
      return compressedBytes;
    } catch (error) {
      console.error(`Error compressing ${file.name}:`, error);
      throw new Error(`Failed to compress ${file.name}. It might be corrupted or password protected.`);
    }
  }
}

export class CompressionServiceFactory {
  static getService(): PdfCompressionService {
    // Return PdfLibCompressionService for now.
    // In the future, this can easily return a GhostscriptCompressionService or API service.
    return new PdfLibCompressionService();
  }
}
