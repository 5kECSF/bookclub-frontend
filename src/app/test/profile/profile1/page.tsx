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
    <div className="relative min-h-[858px] w-full max-w-[1136px] rounded-[10px] bg-white p-6">
      {/* Edit button */}
      <div className="absolute right-[25px] top-[287px] z-10">
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
        <TabsList className="mb-8 flex h-auto gap-3 bg-transparent p-0">
          {navTabs.map((tab) => (
            <div key={tab.id} className="flex flex-col items-center gap-[9px]">
              <TabsTrigger
                value={tab.id}
                className={`h-auto px-3 py-0 ${
                  tab.active
                    ? "font-bold text-[#f4683c] [font-family:'Inter-Bold',Helvetica]"
                    : "font-medium text-[#717b8c] [font-family:'Inter-Medium',Helvetica]"
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
          <div className="flex gap-6">
            {statsCards.map((card) => (
              <Card
                key={card.id}
                className={`${card.bgColor} relative h-[149px] w-[175px] rounded-[10px] border-none`}
              >
                <CardContent className="p-0">
                  <div className="absolute left-[15px] top-[21px] flex h-12 w-[54px] items-center justify-center rounded-[10px] bg-white">
                    {card.icon}
                  </div>
                  <div className="absolute left-[92px] top-6 w-[63px] text-[32px] font-medium leading-[36.0px] tracking-[0] text-white [font-family:'Inter-Medium',Helvetica]">
                    {card.value}
                  </div>
                  <div className="absolute left-[21px] top-[94px] text-[25px] font-medium leading-[28.1px] tracking-[0] text-white [font-family:'Inter-Medium',Helvetica]">
                    {card.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
    </div>
  );
}
