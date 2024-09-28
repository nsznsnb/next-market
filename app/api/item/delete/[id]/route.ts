import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const reqBody = await request.json();
  try {
    const singleItem = await prisma.item.findFirst({
      where: { id: context.params.id },
    });
    if (singleItem?.email === reqBody.email) {
      await prisma.item.delete({
        where: {
          id: context.params.id,
        },
      });
      return NextResponse.json({ message: "アイテム削除成功" });
    } else {
      return NextResponse.json({ message: "他の人が作成したアイテムです。" });
    }
  } catch {
    return NextResponse.json({ message: "アイテム削除失敗" });
  }
}
