"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form } from "antd";
import toast from "react-hot-toast";
import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";

type FormLogin = {
  username: string;
  password: string;
};

export default function SigninPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onSubmit = async (prop: FormLogin) => {
    const res = await signIn("credentials", {
      username: prop.username,
      password: prop.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.error) {
      toast.error("Invalid username or password");
    } else {
      toast.success("Login successfully");
      router.push("/");
    }
  };

  return (
    <>
      <Mobile form={form} onSubmit={onSubmit} />
      <Desktop form={form} onSubmit={onSubmit} />
    </>
  );
}
