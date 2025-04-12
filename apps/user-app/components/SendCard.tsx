"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/transfer";
import toast from "react-hot-toast";

export function SendCard() {
    const [number, setNumber] = useState<string>("");
    const [amount, setAmount] = useState<number>();

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(Math.abs(Number(value)))
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            const res = await p2pTransfer(number, Number(amount) * 100)
                            if(res){
                                toast.success("Payment successfull")
                                setNumber("");
                                setAmount(undefined)
                            } else {
                                toast.error("Something went wrong")
                            }
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}