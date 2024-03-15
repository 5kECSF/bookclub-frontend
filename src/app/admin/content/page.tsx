"use client"
import { KY } from "@/lib/constants"
import { useFetch } from "@/lib/hooks/useQuery"
import { Loader } from "lucide-react"
import React, { useState } from "react"
import { agColumns } from "./column-def"
import AddEditContent from "./add-edit-modal"
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb"
import { TableComponent } from "@/components/AgGrid"
import { AddButton } from "@/app/admin/_components/cell-ui"

const ContentPage = () => {
  const { isLoading, data, isError, error } = useFetch(
    [KY.content],
    `${KY.content}`,
  )
  const [open, setOpen] = useState(false)

  const displayedData = data?.body || []
  // const Table = useReactTable({columns, data: displayedData})
  return (
    <>
      <Breadcrumb pageName="Content" />
      <div className="h-full bg-blue">
        <AddButton onClick={() => {
          setOpen(true)
        }} />
        {
          isLoading ? <div className="flex justify-center items-center min-h-[80vh]">
            <Loader className="animate-spin" />
          </div> : isError ? <div> Fetching Error:
            {error?.message}
          </div> : <div className="pt-8">
            <TableComponent colDefs={agColumns} rowData={displayedData} />
            {/*<Table/>*/}
          </div>
        }
        <AddEditContent isOpen={open} onClose={(e) => setOpen(false)} isUpdate={false} />
      </div>

    </>
  )
}

export default ContentPage