import { NextRequest, NextResponse } from "next/server";
import { unlockPdf } from "@/lib/pdf/unlock";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const password = formData.get("password") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "A valid PDF file is required." },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password is required to unlock the PDF." },
        { status: 400 }
      );
    }

    const unlockedBytes = await unlockPdf(file, password);

    return new NextResponse(unlockedBytes as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="unlocked-document.pdf"',
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("PDF Unlock Error:", error);
    
    if (error.message === 'INCORRECT_PASSWORD') {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to unlock PDF file." },
      { status: 500 }
    );
  }
}
