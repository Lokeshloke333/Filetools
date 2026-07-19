import { NextRequest, NextResponse } from "next/server";
import { processConvert } from "@/lib/image/convert";
import { ConvertSettings } from "@/lib/image/types";
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

    const settings: ConvertSettings = {
      targetFormat: formData.get("targetFormat") as string || "webp",
      quality: parseInt(formData.get("quality") as string, 10) || 80,
      stripMetadata: (formData.get("stripMetadata") as string) !== "false",
    };

    const result = await processConvert({
      buffer,
      mimeType: file.type,
      originalName: file.name || "image",
      settings,
    });

    return new NextResponse(result.buffer, {
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
    console.error("Convert error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process image" },
      { status: 500 }
    );
  }
}
