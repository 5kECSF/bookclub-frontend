import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX } from "react";
import { ProfileUpdateSection } from "./_components/info-update";
import PasswordChange from "./_components/password-change";
const navTabs = [
  { id: "profile", label: "My Profile", active: true },
  { id: "pwdChange", label: "Change Password", active: false },
  { id: "changeEmail", label: "Change Email", active: false },
  { id: "idInfo", label: "Id Information", active: false },
];

export default function Frame(): JSX.Element {
  // Navigation tabs data

  return (
    <div className="relative min-h-[858px] w-full max-w-[1136px] rounded-[10px] bg-white p-6">
      {/* Edit button */}

      {/* Navigation tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8 flex h-auto gap-3 bg-transparent p-0">
          {navTabs.map((tab) => (
            <div key={tab.id} className="flex flex-col items-center gap-[9px]">
              <TabsTrigger
                value={tab.id}
                className={`h-auto px-3 py-0 text-xl data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=active]:bg-transparent  data-[state=active]:font-bold data-[state=active]:text-[#f4683c]`}
              >
                {tab.label}
              </TabsTrigger>
              {/* <div
                className={`h-px w-full ${tab.active ? "bg-[#f4683c]" : "bg-transparent"}`}
              /> */}
            </div>
          ))}
        </TabsList>
        <ProfileUpdateSection value="profile" />
        <PasswordChange value="pwdChange" />
      </Tabs>

      {/* Profile section */}
    </div>
  );
}
