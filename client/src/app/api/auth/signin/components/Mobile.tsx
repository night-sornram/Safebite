"use client";

import { Form, Image, Input, Typography } from "antd";
import { useRouter } from "next/navigation";
import { MdLockOutline, MdMail } from "react-icons/md";
import { GoogleLoginComponent } from "./Google";

interface Props {
  form: any;
  onSubmit: any;
}

export default function Mobile({ form, onSubmit }: Props) {
  const router = useRouter();
  return (
    <main className="h-screen sm:hidden w-full flex justify-center items-end bg-secondary-main">
      <section className=" h-4/5 gap-10 w-full bg-white rounded-t-3xl flex flex-col relative items-center p-6 overflow-auto">
        <hr className="border-4 absolute top-3 w-14 rounded-full border-secondary-main/50" />
        <div className="h-2/5 flex items-end">
          <div>
            <Image
              preview={false}
              src="/images/illustrate-login.svg"
              width={222}
              height={190}
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
            <Form.Item>
              <button
                type="submit"
                className="w-full p-2 text-white rounded-lg bg-secondary-main"
              >
                Sign In
              </button>
            </Form.Item>
          </Form>
          <hr />
          <div className="flex flex-col gap-2 mb-2">
            <p className="text-black text-center font-bold">
              Or Login With
            </p>
            <GoogleLoginComponent />
          </div>
          <Typography.Link
            onClick={() => router.push("../auth/signup")}
            className="text-center text-secondary-main/50"
          >
            Don't have an account? Sign Up
          </Typography.Link>
        </div>
      </section>
    </main>
  );
}
