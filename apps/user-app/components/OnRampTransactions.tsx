import { Card } from "@repo/ui/card"


export const OnRampTransactions = ({
    transactions,
    title = "Transactions",
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
    title?: string
}) => {
    if (!transactions.length) {
        return <Card title={title}>
            <div className="text-center pb-8 pt-8">
                No {title}
            </div>
        </Card>
    } 
    
    return <Card title={title}>
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">

                <div>
                    <div className="text-sm">
                        {getStatement(t.status, title)}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                     Rs {Math.abs(t.amount / 100)}
                </div>

            </div>)}
        </div>
    </Card>
}

const getStatement = (status : string, title? : string) => {
    if(title == "Sent transactions" && status == "Success"){
        return "Sent"
    }
    if(status == "Success"){
        return "Received"
    } else if (status == "Processing"){
        return "Processing"
    } else {
        return "Failed"
    }
}