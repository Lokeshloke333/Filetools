import { NextRequest, NextResponse } from "next/server";
import { convertWordToPdf, WordToPdfOptions, validateWordFile } from "@/lib/pdf/word-to-pdf";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Parse uploaded files
    const files: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === "files" && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "At least one Word document (.docx or .doc) is required." },
        { status: 400 }
      );
    }

    // Validate files
    for (const file of files) {
      const { valid, error } = validateWordFile(file);
      if (!valid) {
        return NextResponse.json({ error: `${file.name}: ${error}` }, { status: 400 });
      }
    }

    // Parse options
    const options: WordToPdfOptions = {
      pageSize: (formData.get("pageSize") as any) || "A4",
      orientation: (formData.get("orientation") as any) || "portrait",
      margins: (formData.get("margins") as any) || "normal",
    };

    const { pdfBytes, pageCount } = await convertWordToPdf(files, options);

    return new NextResponse(pdfBytes as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="converted-word.pdf"',
        "X-Total-Pages": pageCount.toString(),
      },
    });
  } catch (error: any) {
    console.error("Word to PDF API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to convert Word document to PDF." },
      { status: 500 }
    );
  }
}
