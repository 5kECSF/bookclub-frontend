export const ItemStatus = [
  { name: "active" },
  { name: "draft" },
  { name: "deactivated" },
];

export interface PaginatedRes<T> {
  count: number;
  hasNext?: boolean;
  hasPrev?: boolean;

  body: T[];
}
