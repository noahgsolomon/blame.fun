import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, getServerSession } from "next-auth";

console.log("auth.ts: Starting to define authOptions");

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: true,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("auth.ts: signIn callback started", {
        user,
        account,
        profile,
      });
      const response = await fetch("http://localhost:3000/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, account, profile }),
      });
      const data = await response.json();
      console.log("auth.ts: signIn callback - received response", data);
      if (response.ok) {
        user.id = data.id;
        user.accessToken = data.token;
        console.log("auth.ts: signIn callback - sign in successful");
        return true;
      }
      console.log("auth.ts: signIn callback - sign in failed");
      return false;
    },
    async session({ session, token, user }) {
      console.log("auth.ts: session callback started", {
        session,
        token,
        user,
      });
      session.accessToken = token.accessToken as string;
      session.user.id = token.sub as string;
      console.log("auth.ts: session callback - updated session", session);
      return session;
    },
    async jwt({ token, account }) {
      console.log("auth.ts: jwt callback started", { token, account });
      if (account) {
        token.accessToken = account.access_token;
        console.log("auth.ts: jwt callback - updated token", token);
      }
      return token;
    },
    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

console.log("auth.ts: authOptions defined");

const getSession = () => {
  console.log("auth.ts: getSession called");
  return getServerSession(authOptions);
};

console.log("auth.ts: Exporting authOptions and getSession");

export { authOptions, getSession };
