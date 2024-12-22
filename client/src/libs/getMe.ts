import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getMe = async (token: string) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
