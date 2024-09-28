import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
export async function POST(request: NextRequest) {
  try {
    const reqBody: Omit<User, "id"> = await request.json();

    await prisma.user.create({
      data: reqBody,
    });
    return NextResponse.json({ message: "ユーザー登録成功" });
  } catch {
    return NextResponse.json({ message: "ユーザー登録失敗" });
  }
}
