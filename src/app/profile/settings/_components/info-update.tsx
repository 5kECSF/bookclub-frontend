import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon } from "lucide-react";
import { IdImgSection } from "./id-update";

// User profile data
const userData = {
  fullName: "Reinhard Kenson",
  registerNumber: "6022020",
  collegeId: "Kensoncs.official@college.com",
  phoneNumber: "9952508995",
  bio: "I'm a Student",
};

export const ProfileUpdateSection = ({ value }: { value: string }) => {
  return (
    <TabsContent value={value} className="mt-6">
      <IdImgSection />
      <div className="right-[25px] top-[287px] z-10 ml-auto flex">
        <Button
          variant="outline"
          size="icon"
          className="ml-auto h-12 w-12 rounded-[20px] shadow-[0px_0px_10px_#e1e1e1a3]"
        >
          <PencilIcon className="h-[22px] w-[22px]" />
        </Button>
      </div>
      {/* Form fields */}
      <div className="mb-8 grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium text-[#4c535f] [font-family:'Inter-Medium',Helvetica]">
            Full name
          </label>
          <Input
            defaultValue={userData.fullName}
            className="h-[52px] rounded-lg border border-solid border-[#e0e4ec] text-sm font-medium text-[#8d98aa] [font-family:'Inter-Medium',Helvetica]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base font-medium text-[#4c535f] [font-family:'Inter-Medium',Helvetica]">
            College ID
          </label>
          <Input
            defaultValue={userData.collegeId}
            className="h-[52px] rounded-lg border border-solid border-[#e0e4ec] text-sm font-medium text-[#8d98aa] [font-family:'Inter-Medium',Helvetica]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base font-medium text-[#4c535f] [font-family:'Inter-Medium',Helvetica]">
            Register Number
          </label>
          <Input
            defaultValue={userData.registerNumber}
            className="h-[52px] rounded-lg border border-solid border-[#e0e4ec] text-sm font-medium text-[#8d98aa] [font-family:'Inter-Medium',Helvetica]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base font-medium text-[#4c535f] [font-family:'Inter-Medium',Helvetica]">
            phone number
          </label>
          <div className="flex h-[52px] overflow-hidden rounded-lg border border-solid border-[#e0e4ec]">
            <div className="flex items-center px-3.5 text-sm font-medium text-[#8d98aa] [font-family:'Manrope-Medium',Helvetica]">
              +91
            </div>
            <div className="my-2.5 h-[30px] w-px bg-[#e0e4ec]"></div>
            <Input
              defaultValue={userData.phoneNumber}
              className="h-full border-none text-sm font-medium text-[#8d98aa] [font-family:'Inter-Medium',Helvetica]"
            />
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div className="mb-8 flex flex-col gap-2">
        <label className="text-base font-medium text-[#4c535f] [font-family:'Inter-Medium',Helvetica]">
          Bio
        </label>
        <Textarea
          defaultValue={userData.bio}
          className="h-[158px] rounded-lg border border-solid border-[#e0e4ec] bg-[#fafbfc] p-3.5 text-sm font-medium text-[#8d98aa] [font-family:'Inter-Medium',Helvetica]"
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-8">
        <Button className="h-[49px] rounded-lg bg-[#f4683c] px-[35px] py-3 text-lg font-bold text-white [font-family:'Inter-Bold',Helvetica] hover:bg-[#f4683c]/90">
          Update Profile
        </Button>
        <Button
          variant="ghost"
          className="h-auto p-0 text-lg font-medium text-[#4c535f] [font-family:'Inter-Medium',Helvetica]"
        >
          Reset
        </Button>
      </div>
    </TabsContent>
  );
};
