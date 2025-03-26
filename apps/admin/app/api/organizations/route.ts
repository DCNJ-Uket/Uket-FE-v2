/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json([
    {
      organizationId: 1,
      name: "UKET",
    },
    {
      organizationId: 2,
      name: "건국대학교",
    },
  ]);
}
