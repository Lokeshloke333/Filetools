import { PDFDocument } from "pdf-lib";

/**
 * Merges multiple PDF files into a single Uint8Array
 * This can be used on both the server side or client side if needed.
 */
export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    if (file.type !== "application/pdf") {
      throw new Error(`Invalid file type: ${file.name} is not a PDF.`);
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      // Load the PDF. Use ignoreEncryption to allow merging non-password-protected encrypted docs
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    } catch (err) {
      console.error(`Error processing ${file.name}:`, err);
      throw new Error(`Failed to process ${file.name}. It might be corrupted or password protected.`);
    }
  }

  return await mergedPdf.save();
}
