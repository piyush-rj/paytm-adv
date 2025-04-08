"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number){
    const session = await getServerSession(authOptions);
    const sender = session.user.id;

    if(!sender || !to){
        return {
            message: "sender not found"
        }
    }

    const receiver = await prisma.user.findFirst({
        where: {
            number: to
        }
    })

    if(!receiver){
        return {
            message: "receiver not found"
        }
    }

    // using e.balance here instead of prisma.balance coz i want either all of them to happen or none; hence using event rather than prisma everywhere 
    await prisma.$transaction(async (e) => {
        await e.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender)} FOR UPDATE`

        const balance = await e.balance.findUnique({
            where: {
                userId: Number(sender)
            }
        })

        if(!balance || balance.amount < amount){
            return {
                message : "insufficient balance"
            }
        }

        await e.balance.update({
            where: {
                userId: Number(sender)
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        })

        await e.balance.update({
            where: {
                userId: receiver.id
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        })

        await e.p2pTransfer.create({
            data: {
                fromUserId: sender,
                toUserId: receiver.id,
                amount,
                timestamp: new Date()
            }
        })
    })
}