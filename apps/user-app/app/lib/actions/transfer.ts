"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const sender = session?.user?.id;

    if (!sender || !to) {
        return {
            message: "sender not found"
        };
    }

    const receiver = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!receiver) {
        return {
            message: "receiver not found"
        };
    }

    await prisma.$transaction(async (e) => {
        // Lock sender and receiver balances to prevent race conditions
        await e.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender)} FOR UPDATE`;

        const senderBalance = await e.balance.findUnique({
            where: {
                userId: Number(sender)
            }
        });

        if (!senderBalance || senderBalance.amount < amount) {
            throw new Error("Insufficient balance");
        }


        // Deduct from sender
        await e.balance.update({
            where: {
                userId: Number(sender)
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        });

        // Add to receiver
        await e.balance.update({
            where: {
                userId: receiver.id
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        });

        // Record the transfer
        await e.p2pTransfer.create({
            data: {
                fromUserId: Number(sender),
                toUserId: receiver.id,
                amount,
                timestamp: new Date()
            }
        });
    });

    return {
        message: "Transfer successful"
    };
}
