import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface BearState {
  bears: number;
  increase: () => void;
}

export const useBearStore = create<BearState>()(
  devtools(
    // persist(
    (set) => ({
      bears: 0,
      increase: () => set((state) => ({ bears: state.bears + 1 })),
    }),
    //   {
    //     name: "bear-storage",
    //   },
    // ),
  ),
);
