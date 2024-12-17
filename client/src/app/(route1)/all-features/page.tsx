"use client";
import { getMe } from "@/libs/getMe";
import { Button, Card, FloatButton, Image, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <main className="flex h-full items-center justify-center">
      <div className="grid grid-cols-3 gap-6 h-full w-full">
        <div className="bg-slate-300 rounded-xl"></div>
        <div className="bg-slate-400 rounded-xl"></div>
        <div className="bg-slate-500 rounded-xl"></div>
      </div>
    </main>
  );
}
