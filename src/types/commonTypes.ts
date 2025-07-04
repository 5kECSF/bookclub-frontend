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

export enum NotificationEnum {
  General = 'General',
  Individual = 'Individual',
}

export enum ToEnum {
  Admin = 'ADMIN',
  USERS = 'USERS',
}
export interface INotification {

  readonly _id: string;
  title: string;
  body?: string;
  type?: NotificationEnum; //general, single user
  to?: ToEnum; //admin, users
  userId: string;

  createdAt:Date
}