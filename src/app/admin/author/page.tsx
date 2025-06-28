"use client";
import { AddEditModal } from "@/app/admin/author/add-edit-modal";
import { FilterDrawer } from "@/app/admin/author/filter-drawer";
import { PageLayout } from "@/components/admin/crud/generic-page";
import { KY } from "@/lib/constants/routes";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import withAuthorization from "@/lib/functions/withAuthorization";
import { useEffect, useState } from "react";
import { agColumns } from "./model-def";

const AuthorPage = () => {
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
        pageName={"Author"}
        url={KY.author}
        agColumns={agColumns}
      />
      <AddEditModal
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

// export default AuthorPage;
export default withAuthorization(AuthorPage, ["ADMIN"]);
