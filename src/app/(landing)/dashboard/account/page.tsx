"use client"
import { useAuth } from "@/lib/state/context/jotai-auth";
import { redirect } from "next/navigation";
import Body from "./_components/body";

export default function Acccount() {
  const {loggedIn}= useAuth()
  if (!loggedIn) return redirect('/')
  return (
    <main className="  h-full  p-2" >
      <Body />
    </main >
  );
}
