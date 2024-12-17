"use client";
import { Layout } from "antd";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Content({ children }: Props) {
  const { Content } = Layout;
  return (
    <Content
      style={{
        padding: 24,
        minHeight: 280,
        height: "93vh",
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      {children}
    </Content>
  );
}
