"use client";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/lib/state/hooks/useSearch";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
export function Search() {
  const { searchTerm, setSearch } = useSearch();
  const router = useRouter();

  const handleChange = (value: string) => {
    setSearch(value);
  };
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearch(searchTerm);
      router.push(`/books?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleSearch();
    }
  };
  return (
    <div className="relative w-full lg:w-1/2 ">
      <Input
        className="h-[45px] rounded-[20px] bg-[#f6f6f6] pl-6 text-sm  tracking-[1.68px]"
        placeholder="search books..."
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon
        onClick={handleSearch}
        className="absolute right-[25px] top-[13px] h-[18px] w-[18px] text-[#bcbcbc]"
      />
    </div>
  );
}
