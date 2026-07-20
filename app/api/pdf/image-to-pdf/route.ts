import { NextRequest, NextResponse } from "next/server";
import { convertImagesToPdf, ImageToPdfOptions } from "@/lib/pdf/image-to-pdf";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Parse files
    const files: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === "files" && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required." },
        { status: 400 }
      );
    }

    // Parse options
    const options: ImageToPdfOptions = {
      pageSize: (formData.get("pageSize") as any) || "A4",
      orientation: (formData.get("orientation") as any) || "portrait",
      margins: (formData.get("margins") as any) || "none",
      imageFit: (formData.get("imageFit") as any) || "fit",
    };

    const pdfBytes = await convertImagesToPdf(files, options);

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="converted-document.pdf"',
      },
    });
  } catch (error: any) {
    console.error("Image to PDF Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate PDF." },
      { status: 500 }
    );
  }
}
