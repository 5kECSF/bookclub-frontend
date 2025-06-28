"use client";
import { PageLayout } from "@/components/admin/crud/generic-page";
import { KY } from "@/lib/constants/routes";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import withAuthorization from "@/lib/functions/withAuthorization";
import { useEffect, useState } from "react";
import AddEdit from "./add-edit";
import { FilterDrawer } from "./filter-drawer";
import { agColumns } from "./model-def";

const DonationPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [query, setQuery] = useState<Record<string, any>>(getQueryFromUrl({}));

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
