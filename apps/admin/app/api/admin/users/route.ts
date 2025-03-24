import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "../../../../constants/admin-list";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 0;
  const size = Number(searchParams.get("size")) || 10;

  const data = getAdmin(page, size);

  return NextResponse.json(data);
}
