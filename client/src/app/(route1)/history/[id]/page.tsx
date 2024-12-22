"use client";
import { getHistoryByTeam } from "@/libs/getHistoryByTeam";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface History {
  picture: string;
  food_name: string;
  food_ingredients: string;
  alert_message: string;
  is_eatable: boolean;
  date: string;
}

export default function Page() {
  const [history, setHistory] = useState<History[]>([]);
  const { data: session } = useSession();

  const { id } = useParams() as { id: string };

  useEffect(() => {
    getHistoryByTeam(session?.user.token as string, id).then((res) => {
      setHistory(res);
    });
  }, []);

  return (
    <div className="flex flex-col h-full  bg-gray-100 rounded-lg">
      {history.length > 0 ? (
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {history.map((card, index) => (
            <div
              key={index}
              className="h-44 flex items-center justify-between gap-4 p-4 bg-secondary-card rounded-lg shadow-md"
            >
              <div className="flex h-full items-center gap-4">
                <div className="h-full w-2/5">
                  <Image
                    src={card.picture}
                    width={80}
                    height={80}
                    alt="food"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{card.food_name}</h2>
                  <p className="text-sm text-gray-500">
                    {card.date} at {card.date}
                  </p>
                </div>
              </div>
              <button className="p-2 text-white rounded-lg bg-blue-500">
                view detail
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 font-semibold text-3xl">
            No history available
          </p>
        </div>
      )}
    </div>
  );
}
