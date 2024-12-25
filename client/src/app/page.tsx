"use client";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/all-features");
    }, 500);
  }, []);

  return (
    <main className="flex h-screen items-center justify-center">
      <Spin size="large" indicator={<LoadingOutlined spin />} />
    </main>
  );
}
