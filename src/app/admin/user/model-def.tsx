import { IUser, RoleType } from "@/types/user";
import { z } from "zod";
import { MiniAction } from "./user-actions";

export const UserValidator = z.object({
  email: z.string().min(2, { message: "min length is 2" }),
  password: z.string().optional(),
  firstName: z.string().min(2, { message: "min length is 2" }),
  lastName: z.string().optional(),
  role: z.enum([RoleType.USER, RoleType.ADMIN]),
});
export type TUserDto = z.infer<typeof UserValidator>;

// ====== =================  Column Defs for the table ==================
// =====================================================================

export const agColumns = [
  // 1 - undefined - Grid renders the value as a string.
  { field: "email", filter: "agMultiColumnFilter", minWidth: 200 },

  { field: "firstName", filter: "agMultiColumnFilter", minWidth: 100 },
  { field: "lastName", filter: "agMultiColumnFilter", minWidth: 100 },
  {
    field: "role",
    suppressSizeToFit: false, // Allows column to shrink to content size
    filter: "agMultiColumnFilter",
    minWidth: 90, // Adjust based on typical status text length
    maxWidth: 100,
  },
  { field: "accountStatus", filter: "agMultiColumnFilter", minWidth: 150 },
  { field: "team", filter: "agMultiColumnFilter", minWidth: 100 },
  { field: "department", filter: "agMultiColumnFilter",minWidth: 100, maxWidth: 200 },

  { field: "donatedCount", filter: "agMultiColumnFilter",minWidth: 100, maxWidth: 200 },
  { field: "createdAt", filter: "agMultiColumnFilter",minWidth: 100, maxWidth: 200 },

  // 3

  // 4 - Function - A function that returns a JSX element for display
  {
    cellRenderer: (params: { data: IUser }) => <MiniAction row={params.data} />,
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
    minWidth: 170,
    // pinned: "right",
  },
];
