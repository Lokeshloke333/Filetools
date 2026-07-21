import { NextRequest, NextResponse } from "next/server";
import { processRotate } from "@/lib/image/rotate";
import { RotateSettings } from "@/lib/image/types";
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

    const settings: RotateSettings = {
      angle: parseInt(formData.get("angle") as string, 10) || 0,
      background: formData.get("background") as string || undefined,
      flip: (formData.get("flip") as "horizontal" | "vertical" | "none") || "none",
      format: (formData.get("format") as string) || "ORIGINAL",
    };

    const result = await processRotate({
      buffer,
      mimeType: file.type,
      originalName: file.name || "image",
      settings,
    });

    return new NextResponse(new Uint8Array(result.buffer) as any, {
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
    console.error("Rotate error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process image" },
      { status: 500 }
    );
  }
}
