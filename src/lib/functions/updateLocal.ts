import { KY, MTD } from "@/lib/constants"
import { QueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"


export const updateAfterDelete = (key: KY, queryClient: QueryClient, id) => {
  queryClient.setQueryData([key], (prevData: any) => {
    return {
      count: prevData?.count ? prevData?.count - 1 : 0,
      body: prevData?.body?.filter((cat) => cat.id !== id),
    }
  })
}
export const updateLocalData = <T, >(method: MTD, key: KY, queryClient: QueryClient, reset, newData: T, id) => {
  try {

    if (method == MTD.POST) {
      queryClient.setQueryData([key], (prevData: any) => {
        console.log("prev Data", prevData)
        let count = prevData?.count || 0
        let data = prevData?.body || []
        return { ...prevData, count: count + 1, body: [...data, newData?.body ? newData.body : null] }
      })
      reset()
    } else {
      const currentData: { count: number, body: T[] } | undefined = queryClient.getQueryData([key])
      const updatedData = currentData?.body.map((cat) => {
        if (cat.id === id) {
          return { ...cat, ...newData.body }
        }
        return cat
      })
      queryClient.setQueryData([key], { ...currentData, body: updatedData })
    }
  } catch (e) {
    console.log("===>>>//", e)
    toast.error(e.message)
  }

}