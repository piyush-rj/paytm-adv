import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@repo/db/client";

export async function POST(req: Request) {
  const { phone, password } = await req.json();

  if (!phone || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existingUser = await db.user.findFirst({
    where: { number: phone }
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      number: phone,
      password: hashedPassword
    }
  });

  return NextResponse.json({ success: true, user }, { status: 201 });
}
