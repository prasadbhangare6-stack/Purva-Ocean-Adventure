import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
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

    const ext = path.extname(file.name).toLowerCase() || ".jpg";
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
    const filename = `${cleanName || "upload"}-${Date.now()}${ext}`;

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      try {
        const blob = await put(`media/${filename}`, file, {
          access: "public",
          token,
        });
        return NextResponse.json({
          success: true,
          message: "File uploaded successfully.",
          url: blob.url,
          filename,
        });
      } catch (blobErr) {
        console.error("Vercel Blob upload failed, attempting local fallback:", blobErr);
      }
    }

    // Local development fallback
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const mediaDir = path.join(process.cwd(), "public", "media");
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir, { recursive: true });
    }

    const filePath = path.join(mediaDir, filename);
    fs.writeFileSync(filePath, buffer);

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
