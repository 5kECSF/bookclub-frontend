import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function IdImgSection() {
  return (
    <div className="mb-8">
      <p className="mb-4 text-base font-medium text-[#4c535f] [font-family:'Inter-Medium',Helvetica]">
        Your Profile Picture
      </p>

      <div className="flex items-start gap-8">
        {/* Profile picture */}
        <div className="flex w-[116px] flex-col items-center gap-[13px]">
          <Avatar className="h-[100px] w-[100px] shadow-[0px_0px_10px_#ffffffa3]">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-[url(/mask-group.png)] bg-cover"></AvatarFallback>
          </Avatar>
          <p className="text-center text-[10px] font-medium leading-6 tracking-[0] text-[#909090] underline [font-family:'Inter-Medium',Helvetica]">
            Upload New photo
          </p>
        </div>

        {/* Stats cards */}
      </div>
    </div>
  );
}
