import { NextRequest, NextResponse } from "next/server";
import { splitPdf } from "@/lib/pdf/split";
import { PdfSplitMode } from "@/lib/pdf/types";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const mode = formData.get("mode") as PdfSplitMode;
    const ranges = formData.get("ranges") as string | undefined;
    const extract = formData.get("extract") as string | undefined;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "A valid PDF file is required." },
        { status: 400 }
      );
    }

    if (!mode) {
      return NextResponse.json(
        { error: "Split mode is required." },
        { status: 400 }
      );
    }

    const { zipBytes, fileCount } = await splitPdf(file, mode, ranges, extract);

    return new NextResponse(zipBytes as any, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="split-documents.zip"',
        "X-Total-Files": fileCount.toString(),
      },
    });
  } catch (error: any) {
    console.error("PDF Split Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to split PDF file." },
      { status: 500 }
    );
  }
}
