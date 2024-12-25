"use client";
import { getAllTeams } from "@/libs/getAllTeams";
import { Layout, Menu, Button, Avatar } from "antd";
import { useSession, signOut } from "next-auth/react";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import {
  MdChat,
  MdChatBubble,
  MdHistory,
  MdMail,
  MdPerson,
  MdUpload,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "antd";
import { icons } from "antd/es/image/PreviewGroup";

interface Routes {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: Array<{ key: string; icon: React.ReactNode; label: string }>;
}
interface Team {
  team_id: string;
  name: string;
  role: string;
}

export default function SiderLayout() {
  const { data: session } = useSession();
  const router = useRouter();

  const [teams, setTeams] = useState<Team[]>([]);

  const pathname = usePathname();
  const path = pathname.slice(1);
  useEffect(() => {
    getAllTeams(session?.user.token as string).then((res) => {
      setTeams(res);
    });
  }, []);

  return (
    <Sider
      width={264}
      theme="light"
      trigger={null}
      collapsible
      collapsed={false}
    >
      {teams.length > 0 ? (
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[teams[0]?.team_id]}
          onClick={({ key }) => {
            router.push(`/${key}`);
          }}
          selectedKeys={[path]}
          items={[
            ...routes,
            {
              key: "history",
              icon: <MdHistory />,
              label: "History",
              children: teams.map((team: Team) => ({
                key: `history/${team.team_id}`,
                icon: <MdPerson />,
                label: team.name,
              })),
            },
          ].map((item: Routes) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            children: item.children,
          }))}
        />
      ) : (
        <div className=" flex flex-col justify-start items-center ">
          <Skeleton.Node
            active
            style={{ width: 255, height: 40, marginTop: 4 }}
          />
        </div>
      )}
      <div className="absolute bottom-5 w-full px-4">
        <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2">
          <div className="flex gap-3 items-center">
            <Avatar size={36} icon={<MdPerson />} />
            <h1 className="text-base font-semibold">
              {session?.user.username}
            </h1>
          </div>
          <button className="text-gray-400 underline" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </div>
    </Sider>
  );
}

const routes = [
  {
    icon: <MdChatBubble />,
    label: "Chat",
    key: "chat",
  },
  {
    icon: <MdUpload />,
    label: "Upload",
    key: "upload",
  },
];
