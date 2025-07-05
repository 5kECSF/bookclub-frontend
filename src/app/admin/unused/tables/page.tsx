import TableOne from "@/components/admin/stats/TableOne";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/unusedElements/Tables/TableThree";
import TableTwo from "@/components/unusedElements/Tables/TableTwo";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne users={[]} />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default TablesPage;
