import { NextRequest, NextResponse } from "next/server";
import { convertPdfToImagesZip } from "@/lib/pdf/pdfToImage";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file || file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "A valid PDF file is required." },
        { status: 400 }
      );
    }

    const options = {
      format: (formData.get("format") as any) || "PNG",
      quality: (formData.get("quality") as any) || "medium",
      dpi: parseInt((formData.get("dpi") as string) || "150", 10),
      pageSelection: (formData.get("pageSelection") as any) || "all",
      customRange: (formData.get("customRange") as string) || "",
    };

    const { zipBuffer, imageCount } = await convertPdfToImagesZip(file, options);

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="pdf-images.zip"',
        "X-Image-Count": imageCount.toString(),
      },
    });
  } catch (error: any) {
    console.error("PDF to Image Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to convert PDF to images." },
      { status: 500 }
    );
  }
}
