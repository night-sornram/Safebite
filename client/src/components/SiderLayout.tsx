"use client";
import { getAllTeams } from "@/libs/getAllTeams";
import { Layout, Menu } from "antd";
import { useSession } from "next-auth/react";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { MdMail } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Skeleton } from "antd";

export default function SiderLayout() {
  const { data: session } = useSession();
  const router = useRouter();

  const [teams, setTeams] = useState<Team[]>([]);

  interface Team {
    team_id: string;
    name: string;
    role: string;
  }

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
            router.push(`/history/${key}`);
          }}
          items={
            teams &&
            teams.map((team: Team) => ({
              key: team.team_id,
              icon: <MdMail />,
              label: team.name,
            }))
          }
        />
      ) : (
        <div className=" flex flex-col justify-start items-center ">
          <Skeleton.Node
            active
            style={{ width: 255, height: 40, marginTop: 4 }}
          />
        </div>
      )}
    </Sider>
  );
}
