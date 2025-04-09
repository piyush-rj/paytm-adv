import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// add otp and zod validation

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone Number",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Phone number and password are required");
        }

        const user = await db.user.findFirst({
          where: { number: credentials.phone }
        });

        if (!user) {
          // throw redirect to signup
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
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  callbacks: {
    
    async redirect({ baseUrl }: any) {
      return `${baseUrl}/dashboard`;
    },
    async session({ token, session }: any) {
      if (token?.sub) session.user.id = token.sub;
      return session;
    }
  },
  secret: process.env.JWT_SECRET || "secret"
};
