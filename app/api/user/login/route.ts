import { User } from "@prisma/client";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  const reqBody: Omit<User, "id"> = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: reqBody.email,
      },
    });
    console.log(user);
    let errorMessage = "";
    let token = "";
    if (user) {
      if (reqBody.password === user.password) {
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const payload = { email: reqBody.email };
        token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .sign(secretKey);
      } else {
        errorMessage = "ログイン失敗:パスワードが間違っています";
      }
    } else {
      errorMessage = "ログイン失敗：ユーザー登録をしてください";
    }

    if (errorMessage === "") {
      return NextResponse.json({ message: "ログイン成功", token });
    } else {
      return NextResponse.json({ message: errorMessage });
    }
  } catch {
    return NextResponse.json({ message: "ログイン失敗" });
  }
}
