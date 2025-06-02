import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Book, Edit, Gift } from "lucide-react";
import { JSX } from "react";

export default function MainArea(): JSX.Element {
  // Navigation tabs data
  const tabItems = [
    { id: "account", label: "Account Setting", active: true },
    { id: "login", label: "Login & Security", active: false },
    { id: "notifications", label: "Notifications", active: false },
    { id: "interface", label: "Interface", active: false },
  ];

  // Stats cards data
  const statsCards = [
    {
      id: "readings",
      icon: <Book className="w-[29px] h-[29px]" />,
      value: "120",
      label: "Readings",
      bgColor: "bg-[#f27851]",
    },
    {
      id: "contribution",
      icon: <Gift className="w-[21px] h-[21px]" />,
      value: "10",
      label: "Contribution",
      bgColor: "bg-[#926cff]",
    },
  ];

  // Form fields data
  const formFields = [
    {
      id: "fullName",
      label: "Full name",
      value: "Reinhard Kenson",
      colSpan: "col-span-1",
    },
    {
      id: "collegeId",
      label: "College ID",
      value: "Kensoncs.official@college.com",
      colSpan: "col-span-1",
    },
    {
      id: "registerNumber",
      label: "Register Number",
      value: "6022020",
      colSpan: "col-span-1",
    },
    {
      id: "phoneNumber",
      label: "phone number",
      value: "9952508995",
      prefix: "+91",
      colSpan: "col-span-1",
    },
  ];

  return (
    <div className="flex flex-col w-full h-full items-start justify-end p-5 bg-[#f3f3f7] rounded-[0px_10px_10px_0px]">
      <Card className="w-full max-w-[1136px] h-auto relative shadow-[0px_10px_20px_#c2c2c229,0px_0px_30px_#aaaaaa29]">
        <CardContent className="p-6">
          {/* Edit button */}
          <div className="absolute w-12 h-12 top-[287px] right-6 bg-white rounded-[20px] shadow-[0px_0px_10px_#e1e1e1a3] flex items-center justify-center">
            <Edit className="w-[22px] h-[22px]" />
          </div>

          {/* Navigation tabs */}
          <Tabs defaultValue="account" className="mb-8">
            <TabsList className="flex gap-3 bg-transparent h-auto p-0">
              {tabItems.map((tab) => (
                <div key={tab.id} className="flex flex-col items-center">
                  <TabsTrigger
                    value={tab.id}
                    className={`px-3 py-0 data-[state=active]:shadow-none data-[state=active]:bg-transparent ${
                      tab.active
                        ? "[font-family:'Inter-Bold',Helvetica] font-bold text-[#f4683c]"
                        : "[font-family:'Inter-Medium',Helvetica] font-medium text-[#717b8c]"
                    } text-xl`}
                  >
                    {tab.label}
                  </TabsTrigger>
                  <Separator className="w-full mt-[9px]" />
                </div>
              ))}
            </TabsList>
          </Tabs>

          {/* Profile section */}
          <div className="mt-4 mb-8">
            <p className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-base mb-4">
              Your Profile Picture
            </p>

            <div className="flex items-start gap-8">
              {/* Profile picture */}
              <div className="flex flex-col items-center gap-[13px]">
                <Avatar className="w-[100px] h-[100px] rounded-[50px] shadow-[0px_0px_10px_#ffffffa3]">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-white">RK</AvatarFallback>
                </Avatar>
                <p className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#909090] text-[10px] text-center tracking-[0] leading-6 underline whitespace-nowrap">
                  Upload New photo
                </p>
              </div>

              {/* Stats cards */}
              <div className="flex gap-6">
                {statsCards.map((card) => (
                  <div
                    key={card.id}
                    className={`${card.bgColor} rounded-[10px] p-6 w-[175px] h-[149px] relative`}
                  >
                    <div className="w-[54px] h-12 bg-white rounded-[10px] flex items-center justify-center absolute top-[21px] left-[15px]">
                      {card.icon}
                    </div>
                    <div className="absolute w-[63px] top-6 left-[92px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[32px] tracking-[0] leading-[36.0px]">
                      {card.value}
                    </div>
                    <div className="absolute w-[142px] top-[94px] left-[21px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[25px] tracking-[0] leading-[28.1px]">
                      {card.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {formFields.map((field) => (
              <div key={field.id} className={`${field.colSpan} h-[81px]`}>
                <p className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-base mb-[11px]">
                  {field.label}
                </p>
                {field.prefix ? (
                  <div className="flex h-[52px] rounded-lg border border-solid border-[#e0e4ec]">
                    <div className="flex items-center px-3.5 [font-family:'Manrope-Medium',Helvetica] font-medium text-[#8d98aa] text-sm">
                      {field.prefix}
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-[30px] my-auto"
                    />
                    <Input
                      defaultValue={field.value}
                      className="border-0 h-full [font-family:'Inter-Medium',Helvetica] font-medium text-[#8d98aa] text-sm"
                    />
                  </div>
                ) : (
                  <Input
                    defaultValue={field.value}
                    className="h-[52px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#8d98aa] text-sm"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Bio field */}
          <div className="mb-8">
            <p className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-base mb-[11px]">
              Bio
            </p>
            <Textarea
              defaultValue="I'm a Student"
              className="w-full h-[158px] bg-[#fafbfc] [font-family:'Inter-Medium',Helvetica] font-medium text-[#8d98aa] text-sm"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <Button className="bg-[#f4683c] hover:bg-[#f4683c]/90 h-[49px] px-[35px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-lg">
              Update Profile
            </Button>
            <Button
              variant="ghost"
              className="h-[49px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#4c535f] text-lg"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
