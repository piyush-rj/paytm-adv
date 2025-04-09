import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'
import { OnRampTransactions } from '../../../components/OnRampTransactions';
import prisma from '@repo/db/client';

async function getOnRampTransactions(status: any) {

  const session = await getServerSession(authOptions);
  if(!session?.user?.id){
    return [];
  }
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
      status: status
    }
  })
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }))
}

async function getDoneP2PTransactions() {
  const session = await getServerSession(authOptions)
  if(!session?.user?.id){
    return [];
  }
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id)
    }
  })
  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    status: "Success",
    provider: t.toUserId
  }))
}

async function getReceiveP2PTransactions() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    // Handle the case when user is not authenticated
    return []; // Return empty array or handle as needed
  }
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id)
    }
  })
  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    status: "Success",
    provider: t.fromUserId
  }))
}

export default async function () {
  const successTransactions = await getOnRampTransactions("Success")
  const processingTransactions = await getOnRampTransactions("Processing")
  const failedTransactions = await getOnRampTransactions("Failure")
  const sentTransactions: any = await getDoneP2PTransactions()
  const receivedTransactions: any = await getReceiveP2PTransactions()


  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl flex justify-center text-[#000] pt-8 mb-8 font-bold border-b pb-6">
        Transactions
      </h1>

      <div className="w-[80vw] grid grid-cols-1 md:grid-cols-2 px-10 gap-3 border-b pb-20">
        <h1 className="text-2xl text-[#000] pt-2 font-bold col-span-2">
          P2P Transactions
        </h1>

        <div>
          <OnRampTransactions
            title={"Sent transactions"}
            transactions={sentTransactions}
          />
        </div>
        <div>
          <OnRampTransactions
            title={"Received transactions"}
            transactions={receivedTransactions}
          />
        </div>
      </div>

      <div className="w-[80vw] grid grid-cols-1 md:grid-cols-2 px-10 gap-3">
        <h1 className="text-2xl text-[#000] pt-2 font-bold col-span-2">
          Wallet Transactions
        </h1>
        <div>
          <OnRampTransactions
            title={"Successfull transactions"}
            transactions={successTransactions}
          />
        </div>

        <div>
          <OnRampTransactions
            title={"Processing Transactions"}
            transactions={processingTransactions}
          />
        </div>

        <div>
          <OnRampTransactions
            title={"Failure Transactions"}
            transactions={failedTransactions}
          />
        </div>
      </div>
    </div>
  )
}


