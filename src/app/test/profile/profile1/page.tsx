import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BookIcon, GiftIcon, PencilIcon } from "lucide-react";
import { JSX } from "react";

export default function Frame(): JSX.Element {
  // Navigation tabs data
  const navTabs = [
    { id: "account", label: "Account Setting", active: true },
    { id: "login", label: "Login & Security", active: false },
    { id: "notifications", label: "Notifications", active: false },
    { id: "interface", label: "Interface", active: false },
  ];

  // User profile data
  const userData = {
    fullName: "Reinhard Kenson",
    registerNumber: "6022020",
    collegeId: "Kensoncs.official@college.com",
    phoneNumber: "9952508995",
    bio: "I'm a Student",
  };

  // Stats cards data
  const statsCards = [
    {
      id: "readings",
      icon: <BookIcon className="h-[29px] w-[29px]" />,
      value: "120",
      label: "Readings",
      bgColor: "bg-[#f27851]",
    },
    {
      id: "contribution",
      icon: <GiftIcon className="h-[21px] w-[21px]" />,
      value: "10",
      label: "Contribution",
      bgColor: "bg-[#926cff]",
    },
  ];

  return (
    <div className="relative bg-white rounded-[10px] p-6 w-full max-w-[1136px] min-h-[858px]">
      {/* Edit button */}
      <div className="absolute top-[287px] right-[25px] z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-[20px] shadow-[0px_0px_10px_#e1e1e1a3]"
        >
          <PencilIcon className="h-[22px] w-[22px]" />
        </Button>
      </div>

      {/* Navigation tabs */}
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex gap-3 bg-transparent h-auto p-0 mb-8">
          {navTabs.map((tab) => (
            <div key={tab.id} className="flex flex-col items-center gap-[9px]">
              <TabsTrigger
                value={tab.id}
                className={`px-3 py-0 h-auto ${
                  tab.active
                    ? "[font-family:'Inter-Bold',Helvetica] font-bold text-[#f4683c]"
                    : "[font-family:'Inter-Medium',Helvetica] font-medium text-[#717b8c]"
                } text-xl`}
              >
                {tab.label}
              </TabsTrigger>
              <div
                className={`h-px w-full ${tab.active ? "bg-[#f4683c]" : "bg-transparent"}`}
              />
            </div>
          ))}
        </TabsList>
      </Tabs>

      {/* Profile section */}
      <div className="mb-8">
        <p className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-base mb-4">
          Your Profile Picture
        </p>

        <div className="flex items-start gap-8">
          {/* Profile picture */}
          <div className="flex flex-col items-center gap-[13px] w-[116px]">
            <Avatar className="h-[100px] w-[100px] shadow-[0px_0px_10px_#ffffffa3]">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-[url(/mask-group.png)] bg-cover"></AvatarFallback>
            </Avatar>
            <p className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#909090] text-[10px] text-center tracking-[0] leading-6 underline">
              Upload New photo
            </p>
          </div>

          {/* Stats cards */}
          <div className="flex gap-6">
            {statsCards.map((card) => (
              <Card
                key={card.id}
                className={`${card.bgColor} rounded-[10px] border-none w-[175px] h-[149px] relative`}
              >
                <CardContent className="p-0">
                  <div className="absolute w-[54px] h-12 top-[21px] left-[15px] bg-white rounded-[10px] flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div className="absolute w-[63px] top-6 left-[92px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[32px] tracking-[0] leading-[36.0px]">
                    {card.value}
                  </div>
                  <div className="absolute top-[94px] left-[21px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[25px] tracking-[0] leading-[28.1px]">
                    {card.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <label className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-base">
            Full name
          </label>
          <Input
            defaultValue={userData.fullName}
            className="h-[52px] rounded-lg border border-solid border-[#e0e4ec] [font-family:'Inter-Medium',Helvetica] font-medium text-[#8d98aa] text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-base">
            College ID
          </label>
          <Input
            defaultValue={userData.collegeId}
            className="h-[52px] rounded-lg border border-solid border-[#e0e4ec] [font-family:'Inter-Medium',Helvetica] font-medium text-[#8d98aa] text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-base">
            Register Number
          </label>
          <Input
            defaultValue={userData.registerNumber}
            className="h-[52px] rounded-lg border border-solid border-[#e0e4ec] [font-family:'Inter-Medium',Helvetica] font-medium text-[#8d98aa] text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-base">
            phone number
          </label>
          <div className="flex h-[52px] rounded-lg border border-solid border-[#e0e4ec] overflow-hidden">
            <div className="flex items-center px-3.5 [font-family:'Manrope-Medium',Helvetica] font-medium text-[#8d98aa] text-sm">
              +91
            </div>
            <div className="w-px h-[30px] my-2.5 bg-[#e0e4ec]"></div>
            <Input
              defaultValue={userData.phoneNumber}
              className="border-none h-full [font-family:'Inter-Medium',Helvetica] font-medium text-[#8d98aa] text-sm"
            />
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div className="flex flex-col gap-2 mb-8">
        <label className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-base">
          Bio
        </label>
        <Textarea
          defaultValue={userData.bio}
          className="h-[158px] rounded-lg border border-solid border-[#e0e4ec] bg-[#fafbfc] [font-family:'Inter-Medium',Helvetica] font-medium text-[#8d98aa] text-sm p-3.5"
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-8">
        <Button className="bg-[#f4683c] hover:bg-[#f4683c]/90 h-[49px] px-[35px] py-3 rounded-lg [font-family:'Inter-Bold',Helvetica] font-bold text-white text-lg">
          Update Profile
        </Button>
        <Button
          variant="ghost"
          className="h-auto p-0 [font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-lg"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
