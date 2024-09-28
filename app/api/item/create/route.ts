import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Item } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const item: Omit<Item, "id"> = await request.json();
    console.log(item);

    await prisma.item.create({
      data: item,
    });
    return NextResponse.json({ message: "アイテム作成" });
  } catch {
    return NextResponse.json({ message: "アイテム作成失敗" });
  }
}
