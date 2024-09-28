import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Item } from "@prisma/client";

export async function GET() {
  try {
    const allItems: Item[] = await prisma.item.findMany();

    return NextResponse.json({ message: "アイテム読取成功(オール)", allItems });
  } catch {
    return NextResponse.json({ message: "アイテム読取失敗(オール)" });
  }
}
