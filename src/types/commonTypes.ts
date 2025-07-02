export const ItemStatus = [
  { name: "active", label: "Active" },
  { name: "draft", label: "Draft" },
  { name: "deactivated", label: "Deactivated" },
];

export interface PaginatedRes<T> {
  count: number;
  hasNext?: boolean;
  hasPrev?: boolean;

  body: T[];
}
