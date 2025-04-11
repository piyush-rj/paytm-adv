export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import db from "@repo/db/client"

export const GET = async () => {
    await db.user.create({
        data: {
            email: "asd@example.com",
            name: "adsads",
            number: "1234567890",
            password: "somehashedpassword"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}
