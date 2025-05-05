import React from "react";
import FormElements from "@/components/unusedElements/FormElements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Form unusedElements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form unusedElements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormElementsPage = () => {
  return <FormElements />;
};

export default FormElementsPage;
