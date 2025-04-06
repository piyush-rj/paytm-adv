"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
export async function createOnRampTransaction(amount: number, provider: string){

    const session = await getServerSession(authOptions);

    // ideally token should be this 
    // const token = await axios.get("http://api.hdfcbank.com/gettoken", {
    //     amount : amount 
    // })

    const token = Math.random().toString();
    const userId = session.user.id;
    if(!userId) {
        return {
            message: "user not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId,
            amount: amount * 100,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })

    return {
        message: "on ramp transaction added"
    }
}