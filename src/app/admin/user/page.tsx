"use client";
import { KY } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { agColumns } from "./model-def";
import withAuthorization from "@/lib/functions/withAuthorization";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import { AddEditModal } from "./add-edit-modal";
import { FilterDrawer } from "./filter-drawer";
import { PageLayout } from "@/components/admin/crud/page-layout";

const UserPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [query, setQuery] = useState<Record<string, any>>(
    getQueryFromUrl({}),
  );

  useEffect(() => {
    setUrl(query);
  }, [query]);

  return (
    <>
      <PageLayout
        setQuery={setQuery}
        query={query}
        setModalOpen={setModalOpen}
        setFilterOpen={setFilterOpen}
        pageName={"User"}
        url={KY.user}
        agColumns={agColumns}
      />
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

// export default UserPage;
export default withAuthorization(UserPage, ["ADMIN"]);
