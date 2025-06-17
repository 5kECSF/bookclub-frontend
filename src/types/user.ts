
export interface User {
  _id?: string;
  id: string;
  firstName: string;
  lastName: string;
  userName?: string;
  email?: string;
  avatar: string;
  role: string;
  requestedBooks?: string[];
  approvedBooks?: string[];
  borrowedBooks?: string[];
  returnedBooks?: string[];
  donatedCount: number;
}
