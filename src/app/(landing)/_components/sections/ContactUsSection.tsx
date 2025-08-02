import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type JSX } from "react";

export const ContactUsSection = (): JSX.Element => {
  return (
    <section
      id="contact-us"
      className="mx-auto w-full max-w-[808px] py-16 text-center"
    >
      <Card className="border-none shadow-none">
        <CardContent className="flex flex-col items-center gap-8 p-0">
          <h2 className="text-[32px] font-semibold tracking-[1.87px] text-[#173f5f]">
            Do you have Questions?
          </h2>

          <p className="max-w-[808px] text-lg font-normal leading-[30px] tracking-[1.29px] text-[#173f5f]">
            Jump start your book reading by quickly check through the popular
            book categories. Check our amazing book collection by different
            authors. Borrow your favourite books on And Get Started.
          </p>

          <Button
            variant="outline"
            className="h-[55px] w-[202px] rounded-[3px] border-[#173f5f] text-xl font-semibold tracking-[1.17px] text-[#173f5f]"
          >
            <a href="https://t.me/myfellow" aria-label="telegram">
              Contact Us
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};
