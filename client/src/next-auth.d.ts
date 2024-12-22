import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: string;
      name: string;
      surname: string;
      username: string;
      email: string;
      age: number;
      food_allergy: string;
      phone: string;
      role: string;
      token: string;
    };
  }
}
