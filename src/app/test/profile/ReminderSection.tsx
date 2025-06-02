/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JSX } from "react";

export default function ReminderSection(): JSX.Element {
  // Latest updates data
  const latestUpdates = [
    {
      title: "Server Maintenance will be done on 16 Mar 2023 from 9AM to 10AM",
      department: "IT Department",
      postedDate: "Posted on 14 Mar 2023",
    },
    {
      title: "Server Maintenance will be done on 16 Mar 2023 from 9AM to 10AM",
      department: "IT Department",
      postedDate: "Posted on 14 Mar 2023",
    },
    {
      title: "Server Maintenance will be done on 16 Mar 2023 from 9AM to 10AM",
      department: "IT Department",
      postedDate: "Posted on 14 Mar 2023",
    },
  ];

  // Pending books data
  const pendingBooks = [
    {
      title: "The Design of EveryDay Things",
      author: "Don Norman, 1988",
      dueDate: "13 Mar 2023",
      status: "Over Due",
      coverImage: "",
    },
    {
      title: "Java Script Scope & Closures",
      author: "Kyle Simpson, 2014",
      dueDate: "13 Mar 2023",
      status: "Over Due",
      coverImage: "",
    },
  ];

  // Requested books data
  const requestedBooks = [
    {
      title: "The Design of EveryDay Things",
      author: "Don Norman, 1988",
      status: "Not Yet Available",
      statusColor: "bg-[#a0a0a0]",
      note: "Expected by\n15 Mar 2023",
      coverImage: "",
    },
    {
      title: "Java Script Scope & Closures",
      author: "Kyle Simpson, 2014",
      status: "Available Now",
      statusColor: "bg-[#42bb4e]",
      note: "Returned From User",
      coverImage: "",
    },
  ];

  return (
    <section className="w-full py-8">
      <h2 className="mb-6 font-['Inter-SemiBold',Helvetica] text-[25px] font-semibold text-[#4c4c4c]">
        Remainders
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Latest Updates Card */}
        <Card className="rounded-[15px]">
          <CardHeader className="pb-0">
            <CardTitle className="font-['Inter-SemiBold',Helvetica] text-xl font-semibold text-[#4c4c4c]">
              Lates Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col space-y-6">
              {latestUpdates.map((update, index) => (
                <div key={index}>
                  <div className="flex flex-col gap-1.5">
                    <p className="font-['Inter-Regular',Helvetica] text-xl leading-[25.7px] text-[#4c4c4c]">
                      {update.title}
                    </p>
                    <p className="mt-4 font-['Inter-SemiBold',Helvetica] text-[15px] font-semibold leading-[19.3px] text-[#4c4c4c]">
                      {update.department}
                    </p>
                    <p className="mt-5 font-['Inter-Regular',Helvetica] text-[13px] leading-[16.7px] text-neutral-500">
                      {update.postedDate}
                    </p>
                  </div>
                  {index < latestUpdates.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Books Card */}
        <Card className="rounded-[15px]">
          <CardHeader className="pb-0">
            <CardTitle className="font-['Inter-SemiBold',Helvetica] text-xl font-semibold text-[#4c4c4c]">
              Pending Books
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col space-y-6">
              {pendingBooks.map((book, index) => (
                <div key={index}>
                  <div className="flex gap-8">
                    <div className="bg-gray-200 h-[99px] w-[75px] rounded">
                      <img
                        src={book.coverImage || "default.png"}
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-['Inter-Regular',Helvetica] text-xl leading-[25.7px] text-[#4c4c4c]">
                        {book.title}
                      </h3>
                      <p className="font-['Inter-Regular',Helvetica] text-[15px] leading-[19.3px] text-[#4c4c4c]">
                        {book.author}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <p className="font-['Inter-Regular',Helvetica] text-[13px] leading-[16.7px]">
                          <span className="text-neutral-500">
                            {book.dueDate}{" "}
                          </span>
                          <span className="text-[#f23d3d]">
                            ({book.status})
                          </span>
                        </p>
                        <Button
                          variant="outline"
                          className="h-10 rounded-[5px] border-[#f76b56] font-['Inter-SemiBold',Helvetica] text-[15px] font-semibold text-[#f76b56]"
                        >
                          Return
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < pendingBooks.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requested Books Card */}
        <Card className="rounded-[15px]">
          <CardHeader className="pb-0">
            <CardTitle className="font-['Inter-SemiBold',Helvetica] text-xl font-semibold text-[#4c4c4c]">
              Requested Books
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col space-y-6">
              {requestedBooks.map((book, index) => (
                <div key={index}>
                  <div className="flex gap-8">
                    <div className="bg-gray-200 h-[99px] w-[75px] rounded">
                      <img
                        src={book.coverImage || "default.png"}
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-['Inter-Regular',Helvetica] text-xl leading-[25.7px] text-[#4c4c4c]">
                        {book.title}
                      </h3>
                      <p className="font-['Inter-Regular',Helvetica] text-[15px] leading-[19.3px] text-[#4c4c4c]">
                        {book.author}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <p className="whitespace-pre-line font-['Inter-Regular',Helvetica] text-[13px] leading-[16.7px] text-neutral-500">
                          {book.note}
                        </p>
                        <Button
                          className={`h-10 rounded-[5px] font-['Inter-SemiBold',Helvetica] text-[15px] font-semibold text-white ${book.statusColor}`}
                          variant="ghost"
                        >
                          {book.status}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < requestedBooks.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
