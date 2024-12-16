"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const Antd = ({ children }: React.PropsWithChildren) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};

export default Antd;
