"use client";
import { ConfigProvider } from "antd";
import { FC, ReactNode } from "react";
interface IAntdThemeProps {
  children: ReactNode;
}

const AntdTheme: FC<IAntdThemeProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      components: {
        // Table: {
        //   headerBg: '#FFF1F0',
        // },
      },
      token: {
        // Seed Token
        // colorPrimary: "#FF4D4F",
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default AntdTheme;
