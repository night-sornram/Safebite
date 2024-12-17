"use client";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { MdMail } from "react-icons/md";

export default function SiderLayout() {
  return (
    <Sider
      width={264}
      theme="light"
      trigger={null}
      collapsible
      collapsed={false}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <MdMail />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <MdMail />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <MdMail />,
            label: "nav 3",
          },
        ]}
      />
    </Sider>
  );
}
