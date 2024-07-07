import useAxiosAuth from "@/lib/hooks/useAxioxsAuth"
import { useQuery } from "@tanstack/react-query"


export const useFetch = (queryKey: string[], url: string, params = "limit=25") => {
  //Todo Make a build query function
  const axiosAuth = useAxiosAuth()
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await axiosAuth.get(`${url}?${params}`)
        console.log("rssp", response)
        return response.data
      } catch (e: any) {
        console.log("--response.mes", e.message)
        console.log("--response", e)
        return []
      }

    },
  })

}