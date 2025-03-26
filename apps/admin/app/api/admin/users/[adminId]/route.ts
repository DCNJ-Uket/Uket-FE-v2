import { NextRequest, NextResponse } from "next/server";
import { deleteAdmin } from "../../../../../constants/admin-list";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ adminId: string }> },
) {
  const { adminId } = await params;
  const data = deleteAdmin(Number(adminId));

  return NextResponse.json(data);
}
