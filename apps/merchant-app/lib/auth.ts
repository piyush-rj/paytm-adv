import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
      async signIn({ user, account }) {
        console.log("hi signin");
        
        // Use type narrowing instead of a custom type definition
        if (!user?.email || !account) {
          return false;
        }

        // Make sure the provider is what you expect
        if (account.provider !== "google" && account.provider !== "github") {
          return false;
        }

        await db.merchant.upsert({
          select: {
            id: true
          },
          where: {
            email: user.email
          },
          create: {
            email: user.email,
            name: user.name || "",
            auth_type: account.provider === "google" ? "Google" : "Github"
          },
          update: {
            name: user.name || "",
            auth_type: account.provider === "google" ? "Google" : "Github"
          }
        });

        return true;
      }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
}