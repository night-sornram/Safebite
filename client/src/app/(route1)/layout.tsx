import { Layout } from "antd";
import React from "react";
import Content from "@/components/Content";
import SiderLayout from "@/components/SiderLayout";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <SiderLayout />
      <Layout
        style={{
          padding: "24px 16px",
        }}
      >
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
