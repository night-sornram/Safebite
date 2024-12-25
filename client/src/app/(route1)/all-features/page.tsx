"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <main className="flex h-full items-center justify-center">
      <div className="grid grid-cols-3 gap-6 h-56 w-full ">
        <button
          onClick={() => {
            router.push("/chat");
          }}
          className="bg-slate-100 rounded-xl flex  p-8 bg-chat bg-no-repeat bg-cover transition-transform  hover:scale-105"
        >
          <h1 className="text-base font-semibold w-40 text-start">
            Ask about food and medicine that can be taken together
          </h1>
        </button>
        <button
          onClick={() => {
            router.push(`/history/${session?.user}`);
          }}
          className="bg-slate-100 rounded-xl flex items-end  justify-center p-8 bg-tracking bg-no-repeat bg-cover transition-transform  hover:scale-105"
        >
          <h1 className="text-base font-semibold mb-4">Track Your food</h1>
        </button>
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-slate-100 rounded-xl flex items-center justify-center p-8 bg-suggest bg-no-repeat bg-cover transition-transform  hover:scale-105"
        >
          <h1 className="text-base font-semibold">Suggest Drug</h1>
        </button>
      </div>
    </main>
  );
}
