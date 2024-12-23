"use client";

import { Form, Input, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdLockOutline, MdMail } from "react-icons/md";
import { GoogleLoginComponent } from "./Google";

export interface Props {
  form: any;
  onSubmit: any;
}

export default function Desktop({ form, onSubmit }: Props) {
  const router = useRouter();
  return (
    <main className="h-screen max-sm:hidden w-full p-8 bg-secondary-main">
      <section className="max-w-screen-lg w-full h-full mx-auto flex bg-white rounded-lg p-10 overflow-auto">
        <div className="flex flex-col w-2/5 h-full p-8 gap-10 bg-gray-100 rounded-lg">
          <div className="flex flex-col w-full gap-0.5">
            <h1 className="text-secondary-main text-2xl font-bold">
              Getting Started
            </h1>
            <p className="text-secondary-main/50 text-xs">
              Let's login for explore continues
            </p>
          </div>
          <div className="flex flex-col w-full gap-0.5">
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
                <Link
                  href="/auth/forgot-password"
                  className="text-secondary-main/50 text-xs"
                >
                  Forgot Password?
                </Link>
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
            <Link
              href="../auth/signup"
              className="text-center text-secondary-main/50 text-sm"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
        <div className="w-3/5 h-full flex items-center justify-center">
          <div>
            <Image
              src={"/images/illustrate-login.svg"}
              width={400}
              height={400}
              alt="research"
            />
          </div>
        </div>
      </section>
    </main>
  );
}