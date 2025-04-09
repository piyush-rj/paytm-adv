import db from "@repo/db/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone Number",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "Enter phone number" },
        password: { label: "Password", type: "password", placeholder: "Enter password" }
      },
      async authorize(credentials: any) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Phone number and password are required");
        }

        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone
          }
        });

        if (existingUser) {
          const isValid = await bcrypt.compare(credentials.password, existingUser.password);
          if (!isValid) {
            throw new Error("Incorrect password");
          }

          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            number: existingUser.number
          };
        }

        // Register the new user
        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        try {
          const newUser = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword
            }
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            number: newUser.number
          };
        } catch (error) {
          console.error("Error creating user:", error);
          throw new Error("Failed to create user");
        }
      }
    })
  ],

  pages: {
    signIn: '/auth/signin', // Usually under /auth folder
    error: '/auth/error'
  },

  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Always redirect to dashboard after login/signup
      return `${baseUrl}/dashboard`;
    },
  
    async session({ token, session }: any) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
  ,

  secret: process.env.JWT_SECRET || "secret"
};
