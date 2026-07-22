import { PDFDocument } from 'pdf-lib';

/**
 * Attempts to unlock a PDF file with the provided password.
 * Returns the decrypted PDF as a Uint8Array.
 * Throws if the password is incorrect or file is invalid.
 */
export async function unlockPdf(file: File, password?: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { password } as any);
    
    // By default, saving the document without providing any new password options
    // will result in a decrypted (unlocked) PDF.
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (err: unknown) {
    const error = err as Error;
    const msg = error.message?.toLowerCase() || '';
    if (msg.includes('password') || msg.includes('encrypted')) {
      throw new Error('INCORRECT_PASSWORD');
    }
    throw error;
  }
}
