import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";
import type { User, Account, Profile, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone Number",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Phone number and password are required");
        }

        const user = await db.user.findFirst({
          where: { number: credentials.phone }
        });

        if (!user) {
          throw new Error("User not found. Please sign up.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          number: user.number
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }) {
      // Optional check if you want to restrict sign-ins
      if (!user?.id) return false;
      return true;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return `${baseUrl}/dashboard`;
    },
    async session({
      session,
      token
    }: {
      session: Session;
      token: JWT;
    }) {
      if (token?.sub && session.user) {
        (session.user as { id: string }).id = token.sub;
      }
      return session;
    }
  },
  secret: process.env.JWT_SECRET || "secret"
};
