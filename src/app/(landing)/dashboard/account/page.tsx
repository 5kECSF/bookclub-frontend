"use client"
import Body from "./_components/body";
import { redirect } from "next/navigation";
import {useAuth} from "@/lib/state/context/jotai-auth";

export default async function Acccount() {
  const {loggedIn}= useAuth()
  if (!loggedIn) return redirect('/')
  return (
    <main className="  h-full  p-2" >
      <Body />
    </main >
  );
}
