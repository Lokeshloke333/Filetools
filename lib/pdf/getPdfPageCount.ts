import { PDFDocument } from "pdf-lib";

/**
 * Reusable helper to read a PDF file, Blob, Uint8Array, or ArrayBuffer and extract the actual total page count.
 */
export async function getPdfPageCount(
  input: File | Blob | Uint8Array | ArrayBuffer
): Promise<number> {
  try {
    let arrayBuffer: ArrayBuffer;
    if (input instanceof ArrayBuffer) {
      arrayBuffer = input;
    } else if (input instanceof Uint8Array) {
      arrayBuffer = input.buffer.slice(
        input.byteOffset,
        input.byteOffset + input.byteLength
      ) as ArrayBuffer;
    } else {
      arrayBuffer = await input.arrayBuffer();
    }

    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    return pdfDoc.getPageCount();
  } catch (error) {
    console.error("Error extracting PDF page count:", error);
    return 1;
  }
}
