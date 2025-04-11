import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="flex justify-between my-2 border-b border-slate-700 pb-2">
            <div className="dark:text-gray-300">
                Unlocked balance
            </div>
            <div className="dark:text-gray-300">
                {amount / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-700 dark:text-gray-300">
            <div className="mb-2">
                Total Locked Balance
            </div>
            <div>
                {locked / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-700 py-2">
            <div className="dark:text-gray-300">
                Total Balance
            </div>
            <div className="dark:text-gray-300">
                {(locked + amount) / 100} INR
            </div>
        </div>
    </Card>
}