"use client";
import { PageLayout } from "@/components/admin/crud/generic-page";
import { KY } from "@/lib/constants/routes";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import withAuthorization from "@/lib/functions/withAuthorization";
import { useEffect, useState } from "react";
import { AddEditModal } from "./add-edit-modal";
import { FilterDrawer } from "./filter-drawer";
import { agColumns } from "./model-def";

const GenrePage = () => {
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
      <PageLayout
        setQuery={setQuery}
        query={query}
        setModalOpen={setModalOpen}
        setFilterOpen={setFilterOpen}
        pageName={"Genre"}
        url={KY.genre}
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

// export default GenrePage;
export default withAuthorization(GenrePage, ["ADMIN"]);
