import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name).toLowerCase() || ".jpg";
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
    const filename = `${cleanName || "upload"}-${Date.now()}${ext}`;

    const mediaDir = path.join(process.cwd(), "public", "media");
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir, { recursive: true });
    }

    const filePath = path.join(mediaDir, filename);
    fs.writeFileSync(filePath, buffer);

    // Also copy to backend/uploads if backend exists
    const backendUploads = path.join(process.cwd(), "..", "backend", "uploads");
    if (fs.existsSync(backendUploads)) {
      try {
        fs.writeFileSync(path.join(backendUploads, filename), buffer);
      } catch {
        // Non-critical
      }
    }

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully.",
      url: `/media/${filename}`,
      filename,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, message: "Upload failed." }, { status: 500 });
  }
}

