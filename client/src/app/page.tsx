"use client";
import { Button, FloatButton, Spin } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = () => {
    router.push("/api/auth/signout");
  };

  const handleClicked = () => {
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
    </main>
  );
}
