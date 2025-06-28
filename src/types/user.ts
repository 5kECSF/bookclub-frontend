export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export interface IUser {
  _id?: string;

  firstName: string;
  lastName: string;
  bio?: string;
  email?: string;
  idNumber?:string
  team?:string
  department?:string
  role: RoleType;
  accountStatus: ACCOUNT_STATUS;
  
  avatar: string;
  //
  requestedBooks?: string[];
  approvedBooks?: string[];
  borrowedBooks?: string[];
  returnedBooks?: string[];
  donatedCount: number;
  active?: boolean;
  //unused
  fullName?: string;
  userName?: string;
  phoneNo?: string;
  id: string;
}
export enum ACCOUNT_STATUS {
  REGISTERED = 'REGISTERED',
  UN_APPROVED = 'UN_APPROVED', //when the user verifies his email
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}
export const teamData = [
  { name: "Action" },
  { name: "Shepherds" },
  { name: "Prayer" },
  { name: "Bible Study" },
  { name: "Holistic" },
  { name: "Choir" },
  { name: "Litrature" },
];export const deptData = [
  { name: "SITE" },
  { name: "Electrical" },
  { name: "Mechanical" },
  { name: "Civil" },
  { name: "Bio-Medical" },
  { name: "Chemical Engineering" },
  { name: "Pre Engineering" },
  { name: "6 Kilo" },
  { name: "Natural Scinces" },
  { name: "FB" },
];

