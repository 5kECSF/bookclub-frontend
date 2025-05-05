"use client";
import { KY } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { agColumns } from "./model-def";
import withAuthorization from "@/lib/functions/withAuthorization";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import AddEdit  from "./add-edit";
import { FilterDrawer } from "./filter-drawer";
import { PageLayout } from "@/components/admin/crud/page-layout";

const DonationPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [query, setQuery] = useState<Record<string, any>>(
    getQueryFromUrl({ }),
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
        pageName={"Donation"}
        url={KY.donation}
        agColumns={agColumns}
      />
      <AddEdit
        isOpen={modalOpen}
        onClose={(e) => setModalOpen(false)}
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

// export default DonationPage;
export default withAuthorization(DonationPage, ["ADMIN"]);
