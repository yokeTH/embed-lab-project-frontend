import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@something.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const res = await fetch(
          "https://pet-sosiety-backend.sern-dev.workers.dev/login",
          {
            method: "post",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.status == 200) {
          const { user, token, exp } = (await res.json()).data;
          return { ...user, token, exp };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    jwt: async ({ token, user, account, profile, trigger }: any) => {
      if (user) {
        token.user = user;
      }
      if (token.user) {
        const now = Date.now() / 1000;
        if (token.user.exp > now) {
          return token;
        } else {
          return {};
        }
      }
      return {};
    },
    session: async ({ session, token }: any) => {
      if (token.user) {
        session.user = token.user;
        return session;
      }
      return {};

      // if (session.user) {
      //   const now = new Date(Date.now());
      //   const exp = new Date("2024-05-23T06:05:19.272Z");
      //   if (now.getTime() > exp.getTime()) {
      //     return {};
      //   }
      //   return { ...session, expires: session.user.exp };
      // }
      // return {};
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config) satisfies Promise<Session | null>;
}
