"use client";

import { getHistory } from "@/libs/getHistory";
import { Image } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const [cards, setCards] = useState<Array<HistoryProps>>([]);

  const fetchHistory = async () => {
    try {
      const res = await getHistory(session?.user.token as string);
      console.log(res);
      setCards(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col h-full  bg-gray-100 rounded-lg">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {cards.slice(3).map((card, index) => (
          <div
            key={index}
            className="h-44 flex items-center justify-between gap-4 p-4 bg-secondary-card rounded-lg shadow-md"
          >
            <div className="flex h-full items-center gap-4">
              <div className="flex items-center h-full ">
                <Image
                  src={card.picture}
                  width={180}
                  height={140}
                  alt="food"
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{card.food_name}</h2>
                <p className="text-sm text-gray-500">{card.CreateAt}</p>
              </div>
            </div>
            <button className="p-2 text-white rounded-lg bg-blue-500">
              view detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
