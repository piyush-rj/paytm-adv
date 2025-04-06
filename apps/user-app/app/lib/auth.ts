import db from "@repo/db/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions = {
    providers :[
        CredentialsProvider({
            name: "Phone Number",
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder:"enter number"},
                password: { label: "Password", type:"password", placeholder:"enter password"}
            },
            async authorize (credentials: any) {
                // add zod and otp validation
                const hashedPassword = await bcrypt.hash(credentials.password, 10)
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if(passwordValidation){
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    } else {
                        throw new Error("Incorrect assword")
                    }
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
                    // do otp validation here

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        number: user.number
                    }
                } catch (error) {
                    console.error(error)
                }
                return null
            }
        })
    ],

    secret: process.env.JWT_SECRET || "secret",
    callbacks: {

        async session({ token, session }: any) {
            session.user.id = token.sub

            return session;
        }
    }
}