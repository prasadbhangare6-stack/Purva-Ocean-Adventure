import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { requirePermission } from "@/lib/auth/guards";

const DATA_FILE = path.join(process.cwd(), "data", "enquiries.json");
const CSV_FILE = path.join(process.cwd(), "data", "enquiries.csv");
const BACKEND_DATA_FILE = path.join(process.cwd(), "..", "backend", "data", "enquiries.json");
const BACKEND_CSV_FILE = path.join(process.cwd(), "..", "backend", "data", "enquiries.csv");

export async function GET() {
  try {
    await requirePermission("enquiries", "read");
    if (!fs.existsSync(DATA_FILE)) return NextResponse.json({ success: true, data: [] });
    const list = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load enquiries";
    return NextResponse.json({ success: false, message }, { status: 403 });
  }
}

export async function DELETE(req: Request) {
  try {
    await requirePermission("enquiries", "delete");
    const body = await req.json().catch(() => ({}));
    const id = body.id;

    let list = [];
    if (fs.existsSync(DATA_FILE)) {
      list = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    }

    if (id) {
      list = list.filter((item: { id: string }) => item.id !== id);
    } else if (body.all) {
      list = [];
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
    if (fs.existsSync(path.dirname(BACKEND_DATA_FILE))) {
      fs.writeFileSync(BACKEND_DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
    }

    // Rebuild CSV
    const csvHeader = '"Timestamp","Full Name","Email (Gmail)","Phone / WhatsApp","Trip / Dive Experience","Message & Notes"\n';
    let csvRows = "";
    for (const item of list) {
      const row = [
        item.formattedTimestamp || item.submittedAt,
        item.fullName,
        item.email,
        item.phone,
        item.experienceLevel,
        item.message || "",
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
      csvRows += row + "\n";
    }
    fs.writeFileSync(CSV_FILE, csvHeader + csvRows, "utf-8");
    if (fs.existsSync(path.dirname(BACKEND_CSV_FILE))) {
      fs.writeFileSync(BACKEND_CSV_FILE, csvHeader + csvRows, "utf-8");
    }

    return NextResponse.json({ success: true, message: "Enquiry removed successfully", data: list });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to remove enquiry";
    return NextResponse.json({ success: false, message }, { status: 403 });
  }
}

