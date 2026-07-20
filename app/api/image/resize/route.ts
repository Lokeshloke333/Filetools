import { NextRequest, NextResponse } from "next/server";
import { processResize } from "@/lib/image/resize";
import { ResizeSettings } from "@/lib/image/types";
import { validateImage } from "@/lib/image/validation";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const validation = validateImage(file, 50);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const settings: ResizeSettings = {
      width: formData.get("width") ? parseInt(formData.get("width") as string, 10) : undefined,
      height: formData.get("height") ? parseInt(formData.get("height") as string, 10) : undefined,
      maintainAspectRatio: (formData.get("maintainAspectRatio") as string) !== "false",
      fit: (formData.get("fit") as "contain" | "cover" | "fill" | "inside" | "outside") || "inside",
      format: (formData.get("format") as string) || "ORIGINAL",
    };

    const result = await processResize({
      buffer,
      mimeType: file.type,
      originalName: file.name || "image",
      settings,
    });

    return new NextResponse(Buffer.from(result.buffer), {
      headers: {
        "Content-Type": `image/${result.outputFormat}`,
        "Content-Disposition": `attachment; filename="${result.filename}"`,
        "x-original-size": file.size.toString(),
        "x-processed-size": result.buffer.length.toString(),
        "x-filename": result.filename,
        "x-width": result.width.toString(),
        "x-height": result.height.toString(),
      },
    });
  } catch (error: any) {
    console.error("Resize error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process image" },
      { status: 500 }
    );
  }
}
