import express from "express"
import db from "@repo/db/client"

const app = express();


app.post("/hdfcwebhook", async (req, res) => {
    const paymentInformation : {
        token: string,
        userId: string,
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    // transactions
    try {
        await db.$transaction([
            db.balance.updateMany({
                where:{
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
                data:{
                    status: "Success"
                }
            })
        ]);

        // transaction succeded
        res.status(200).json({
            msg: "captured"
        })

    } catch (error) {
        console.error(error);
        res.status(403).json({
            msg: "error while processing webhook"
        })
    }
})

app.listen(3003, () => {
    console.log("bank webhook server running on port 3003")
})