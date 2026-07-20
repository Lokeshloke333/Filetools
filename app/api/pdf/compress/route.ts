import { NextRequest, NextResponse } from "next/server";
import { compressPdf } from "@/lib/pdf/compress";
import { PdfCompressionLevel } from "@/lib/pdf/types";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const level = formData.get("level") as PdfCompressionLevel;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "A valid PDF file is required." },
        { status: 400 }
      );
    }

    if (!level) {
      return NextResponse.json(
        { error: "Compression level is required." },
        { status: 400 }
      );
    }

    const compressedBytes = await compressPdf(file, level);

    return new NextResponse(compressedBytes as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="compressed-document.pdf"',
      },
    });
  } catch (error: any) {
    console.error("PDF Compress Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to compress PDF file." },
      { status: 500 }
    );
  }
}
