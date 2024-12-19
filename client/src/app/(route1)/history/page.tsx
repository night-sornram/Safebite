"use client";

import Image from "next/image";

const cards = [
  {
    img: "/images/cat.jpg",
    date: "2021-02-09",
    time: "10:00",
    menu: "Sandwich",
  },
  {
    img: "/images/cat.jpg",
    date: "2021-02-09",
    time: "10:00",
    menu: "Sandwich",
  },
  {
    img: "/images/cat.jpg",
    date: "2021-02-09",
    time: "10:00",
    menu: "Sandwich",
  },
  {
    img: "/images/cat.jpg",
    date: "2021-02-09",
    time: "10:00",
    menu: "Sandwich",
  },
  {
    img: "/images/cat.jpg",
    date: "2021-02-09",
    time: "10:00",
    menu: "Sandwich",
  },
  {
    img: "/images/cat.jpg",
    date: "2021-02-09",
    time: "10:00",
    menu: "Sandwich",
  },
  {
    img: "/images/cat.jpg",
    date: "2021-02-09",
    time: "10:00",
    menu: "Sandwich",
  },
  {
    img: "/images/cat.jpg",
    date: "2021-02-09",
    time: "10:00",
    menu: "Sandwich",
  },
  {
    img: "/images/cat.jpg",
    date: "2021-02-09",
    time: "10:00",
    menu: "Sandwich",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col h-full  bg-gray-100 rounded-lg">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="h-44 flex items-center justify-between gap-4 p-4 bg-secondary-card rounded-lg shadow-md"
          >
            <div className="flex h-full items-center gap-4">
              <div className="h-full w-2/5">
                <Image
                  src={card.img}
                  width={80}
                  height={80}
                  alt="food"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{card.menu}</h2>
                <p className="text-sm text-gray-500">
                  {card.date} at {card.time}
                </p>
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
