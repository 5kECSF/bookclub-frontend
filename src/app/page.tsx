"use client";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

import { Child1, Child2, Parent } from "@/components/admin/crud/tests/generic-test";

export default function Home() {
  return (
    <div>
      {/*<Controls />*/}
      <Parent>
        <Child1 />
        <Child2 />
      </Parent>
      NO Data
    </div>
  );
}
