"use client";
import { getMe } from "@/libs/getMe";
import { Button, FloatButton, Image, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = () => {
    router.push("/api/auth/signout");
  };

  const handleClicked = async () => {
    console.log(session);
  };

  return (
    <main className="flex items-center justify-center">
      <button
        onClick={handleSignOut}
        className="p-2 text-white rounded-lg bg-blue-500"
      >
        Hello World
      </button>
      <button
        onClick={handleClicked}
        className="p-2 text-white rounded-lg bg-blue-500"
      >
        Good
      </button>
      <Image src="/images/cat.jpg" alt="logo" width={200} height={200} />
    </main>
  );
}
