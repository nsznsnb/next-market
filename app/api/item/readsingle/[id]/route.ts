import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  console.log(context.params.id);
  const id = context.params.id;
  try {
    const singleItem = await prisma.item.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      message: "アイテム読取成功(シングル)",
      singleItem,
    });
  } catch {
    return NextResponse.json({ message: "アイテム読取失敗(シングル)" });
  }
}
