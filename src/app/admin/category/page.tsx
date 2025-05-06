"use client";
import { AddEditModal } from "@/app/admin/category/add-edit-modal";
import { FilterDrawer } from "@/app/admin/category/filter-drawer";
import { PageLayout } from "@/components/admin/crud/generic-page";
import { KY } from "@/lib/constants";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import withAuthorization from "@/lib/functions/withAuthorization";
import { useEffect, useState } from "react";
import { agColumns } from "./model-def";

const CategoryPage = () => {
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
        pageName={"Category"}
        url={KY.category}
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

// export default CategoryPage;
export default withAuthorization(CategoryPage, ["ADMIN"]);
