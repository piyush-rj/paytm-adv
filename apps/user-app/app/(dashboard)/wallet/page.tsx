import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return {
            amount: 0,
            locked: 0
        };
    }
    const balance = await prisma.balance.findUnique({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return [];
    }
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-full ">
        <div className="text-6xl dark:text-gray-800 text-[#000] pt-8 mb-8 font-bold flex justify-center tracking-wide">
            TRANSFER
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-10 ml-[200px] mr-[200px]">
            <div>
                <AddMoney />
            </div>
            <div className="pr-10">
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions}/>
                </div>
            </div>
        </div>
    </div>
}