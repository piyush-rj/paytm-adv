import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    console.log(req.body)

    const token = req.body.token;
    if(!token){
        return res.status(403).json( {
            message: "missing token in req"
        })
    }

    const existingTransaction = await db.onRampTransaction.findFirst({
        where: {
            token: token,
            status: "Success"
        }
    })

    if(existingTransaction){
        return res.status(411).json({
            message: "Transaction already done"
        })
    }

    const safeAmount = Math.abs(req.body.amount)
    const paymentInformation: {
        token: string;
        userId: string;
        amount: number
    } = {
        token: req.body.token,
        userId: req.body.userId,
        amount: safeAmount
    };

    try {
        console.log(paymentInformation)
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
        return;
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
        return;
    }

})

app.post("/payment", async (req, res) => {


     const paymentInformation = await db.balance.findMany({
        where: {
            userId: Number(req.body.userId)
        },
        // data: {
        //     amount: {
        //         increment: Number(req.body.amount)
        //     }
        // }
     })

     console.log(paymentInformation);
     res.json({
        msg: "done"
     })
     return;
})

app.listen(3003);