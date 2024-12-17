"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Form, Input, Typography } from "antd";
import { MdLockOutline, MdMail } from "react-icons/md";
import toast from "react-hot-toast";

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
    <main className="h-screen  w-full flex justify-center items-end bg-secondary-main">
      <section className=" h-4/5 max-w-md gap-10 w-full bg-white rounded-t-3xl flex flex-col relative items-center p-6">
        <hr className="border-4 absolute top-3 w-14 rounded-full border-secondary-main/50" />
        <div className="h-2/5 flex items-end">
          <div>
            <Image
              src="/images/illustrate-login.svg"
              width={222}
              height={219}
              alt="research"
            />
          </div>
        </div>
        <div className="h-3/5 flex flex-col w-full gap-6">
          <div className="flex flex-col w-full gap-0.5">
            <h1 className="text-secondary-main text-2xl font-bold">
              Getting Started
            </h1>
            <p className="text-secondary-main/50 text-xs">
              Let's login for explore continues
            </p>
          </div>
          <Form form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                type="email"
                size="large"
                placeholder="Username"
                prefix={<MdMail className="mr-2" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input
                type="password"
                size="large"
                placeholder="Password"
                prefix={<MdLockOutline className="mr-2" />}
              />
            </Form.Item>
            <Form.Item
              className="flex justify-end"
              style={{ marginBottom: "10px" }}
            >
              <Typography.Link
                onClick={() => router.push("/auth/forgot-password")}
                className="text-secondary-main/50"
              >
                Forgot Password?
              </Typography.Link>
            </Form.Item>
            <button
              type="submit"
              className="w-full p-2 text-white rounded-lg bg-secondary-main"
            >
              Sign In
            </button>
            {/* <Typography.Link
              onClick={() => router.push("/auth/signup")}
              className="text-center text-secondary-main/50"
            >
              Don't have an account? Sign Up
            </Typography.Link> */}
          </Form>
        </div>
      </section>
    </main>
  );
}
