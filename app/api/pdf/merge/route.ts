import { NextRequest, NextResponse } from "next/server";
import { mergePdfs } from "@/lib/pdf/merge";

export const maxDuration = 60; // Extend duration for large files if deployed to Vercel

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: "At least two PDF files are required for merging." },
        { status: 400 }
      );
    }

    const mergedPdfBytes = await mergePdfs(files);

    return new NextResponse(mergedPdfBytes as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="merged-document.pdf"',
      },
    });
  } catch (error: any) {
    console.error("PDF Merge Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to merge PDF files." },
      { status: 500 }
    );
  }
}
