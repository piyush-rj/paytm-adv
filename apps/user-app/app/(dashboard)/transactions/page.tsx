import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'
import { OnRampTransactions } from '../../../components/OnRampTransactions';
import prisma from '@repo/db/client';

async function getOnRampTransactions(status: any) {

  const session = await getServerSession(authOptions);
  // if(!session?.user?.id){
  //   return [];
  // }
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id),
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
  // if(!session?.user?.id){
  //   return [];
  // }
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    }
  })
  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    status: "Success",
    provider: t.toUserId,
  }))
}

async function getReceiveP2PTransactions() {
  const session = await getServerSession(authOptions)
  // if (!session?.user?.id) {
  //   return []; 
  // }
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session.user.id)
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
    <div className="pl-10 pr-10 flex flex-col gap-5 justify-center h-full dark:bg-black ml-[200px] mr-[200px]">
      <h1 className="text-6xl dark:text-gray-800 tracking-wide flex justify-center text-[#000] pt-8 mb-4 font-bold pb-6">
        TRANSACTIONS
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 px-10 gap-3 border-b dark:border-gray-800 pb-10 ">
        <h1 className="text-3xl text-[#000] pb-4 font-bold col-span-2 dark:text-gray-600">
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

      <div className="w-full grid grid-cols-1 md:grid-cols-2 px-10 gap-3 dark:bg-black">
        <h1 className="text-3xl text-[#000] font-bold col-span-2 pb-4 pt-4 dark:text-gray-600">
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


