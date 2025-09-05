// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      // first login: copy minimal identity into the token
      if (account && profile) {
        token.id = token.sub; // stable user id
        token.name = profile.name as string | undefined;
        token.email = profile.email as string | undefined;
        token.picture = (profile as any).picture as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      // expose same fields to the client
      if (session.user) {
        session.user.id = (token.id ?? token.sub) as string;
        session.user.name = token.name as string | null | undefined;
        session.user.email = token.email as string | null | undefined;
        session.user.image = token.picture as string | null | undefined;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (!user.id) return;
      try {
        await prisma.highScore.upsert({
          where: { userID: user.id },
          update: {},
          create: {
            userID: user.id,
            easyScore: 0,
            mediumScore: 0,
            hardScore: 0,
          },
        });
      } catch (err) {
        console.error("highScore upsert failed", err);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
