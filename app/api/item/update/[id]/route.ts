import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Item } from "@prisma/client";

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const reqBody: Omit<Item, "id"> = await request.json();
  try {
    const singleItem = await prisma.item.findFirst({
      where: { id: context.params.id },
    });
    if (singleItem?.email === reqBody.email) {
      await prisma.item.update({
        where: { id: context.params.id },
        data: reqBody,
      });

      return NextResponse.json({ message: "アイテム編集成功" });
    } else {
      return NextResponse.json({ message: "他の人が作成したアイテムです。" });
    }
  } catch {
    return NextResponse.json({ message: "アイテム編集失敗" });
  }
}
