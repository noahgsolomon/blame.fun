import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }

  interface Session {
    accessToken: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
