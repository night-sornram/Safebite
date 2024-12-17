import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      surname: string;
      username: string;
      email: string;
      age: number;
      phone: string;
      role: string;
      token: string;
    };
  }
}
