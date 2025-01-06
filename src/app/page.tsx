"use client";
// import { Metadata } from "next";
import { useBearStore } from "@/lib/state/context/zustand";
import useAuthStore from "@/lib/state/context/zustand-auth";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Home() {
  const bears = useBearStore((state) => state.bears);
  const token = useAuthStore((state) => state);

  return (
    <div>
      <Controls />
      NO Data{bears}
      <div>{token.accessToken}</div>
      <button onClick={token.increase}>one up</button>
    </div>
  );
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increase);
  return <button onClick={increasePopulation}>one up</button>;
}
