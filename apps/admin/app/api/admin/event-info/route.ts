import { NextRequest, NextResponse } from "next/server";
import { getAdminEventInfo } from "../../../../constants/admin-event-info";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  const data = getAdminEventInfo(page, size);

  return NextResponse.json(data);
}
