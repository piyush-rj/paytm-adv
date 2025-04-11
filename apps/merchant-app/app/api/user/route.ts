import { NextResponse } from "next/server"
import db from "@repo/db/client"

export const GET = async () => {
    await db.user.create({
        data: {
            email: "asd@example.com",
            name: "adsads",
            number: "1234567890", // Add this required field
            password: "somehashedpassword" // Add this required field
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}