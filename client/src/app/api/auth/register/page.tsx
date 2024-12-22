"use client";

import { Form } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Desktop from "./components/Destop";
import Mobile from "./components/Mobile";
import { FormLogin } from "../signin/page";
import { useState, useEffect } from "react";

export default function registerPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loginData, setLoginData] = useState<FormLogin | null>(null);

  useEffect(() => {
    if (loginData) {
      signIn("credentials", {
        username: loginData.username,
        password: loginData.password,
        redirect: false,
        callbackUrl: "/",
      }).then((res) => {
        if (res?.error) {
          toast.error("Invalid username or password");
        } else {
          toast.success("Login successfully");
          router.push("/");
        }
      }).catch((error) => {
        toast.error("An unexpected error occurred");
        console.error("Sign-in error:", error);
      });
    }
  }, [loginData, router]);

  const onSubmit = (prop: FormLogin) => {
    setLoginData(prop);
  };

  return (
    <>
      <Mobile form={form} onSubmit={onSubmit} />
      <Desktop form={form} onSubmit={onSubmit} />
    </>
  );
}