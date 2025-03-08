"use client";
import { KY } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { agColumns } from "./model-def";
import withAuthorization from "@/lib/functions/withAuthorization";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import { AddEditModal } from "./add-edit-modal";
import { FilterDrawer } from "./filter-drawer";
import { PageLayout } from "@/components/admin/crud/page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
const BorrowPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [query, setQuery] = useState<Record<string, any>>(
    getQueryFromUrl({ status: "active" }),
  );

  useEffect(() => {
    setUrl(query);
  }, [query]);

  return (
    <>
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account"><PageLayout
                setQuery={setQuery}
                query={query}
                setModalOpen={setModalOpen}
                setFilterOpen={setFilterOpen}
                pageName={"Borrow"}
                url={KY.borrow}
                agColumns={agColumns}
            /></TabsContent>
            <TabsContent value="password"><PageLayout
                setQuery={setQuery}
                query={query}
                setModalOpen={setModalOpen}
                setFilterOpen={setFilterOpen}
                pageName={"Borrow2"}
                url={KY.borrow}
                agColumns={agColumns}
            /></TabsContent>
        </Tabs>

      <AddEditModal
        isOpen={modalOpen}
        onClose={setModalOpen}
        isUpdate={false}
      />
      <FilterDrawer
        setQuery={setQuery}
        filterOpen={filterOpen}
        setFilterOpen={(e: any) => setFilterOpen(false)}
      />
    </>
  );
};

// export default BorrowPage;
export default withAuthorization(BorrowPage, ["ADMIN"]);
