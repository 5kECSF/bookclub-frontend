import { setUrl } from "@/lib/functions/url";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export const searchAtom = atom<string>("");
searchAtom.debugLabel = "searchParam";

export const useSearch = () => {
  const [searchTerm, setSearch] = useAtom(searchAtom);
  useEffect(() => {
    setUrl({ q: searchTerm });
  }, [searchTerm]);
  return {
    searchTerm,
    setSearch,
  };
};
