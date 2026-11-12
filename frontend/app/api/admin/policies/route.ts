import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/guards";
import { getPoliciesStore, savePoliciesStore, type PoliciesData } from "@/lib/data/policiesStore";

export async function GET() {
  try {
    const data = getPoliciesStore();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch policies" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requirePermission("policies", "update");
    const body = (await req.json()) as PoliciesData;

    if (!body || !body.terms || !body.privacy || !body.cancellation) {
      return NextResponse.json({ message: "Invalid policies payload" }, { status: 400 });
    }

    savePoliciesStore(body);
    return NextResponse.json({ success: true, message: "Policies updated successfully", data: body });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update policies";
    return NextResponse.json({ success: false, message }, { status: 403 });
  }
}

