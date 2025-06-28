export enum API {
  register = "auth/register",
  activate = "auth/activate",
  login = "auth/login",
  refresh = "auth/resetTokens",
  logout = "auth/logout",
  forgotPwd = "auth/forgotPassword",
  resetPwd = "auth/resetPassword",
  changePwd = "profile/changePassword",
  requestEmailChange = "auth/requestEmailChange",
  verifyUpdateEmail = "auth/verifyUpdateEmail",
}
export enum KY {
  //library modules
  latestBooks = "latestBooks",
  category = "category",
  genre = "genre",
  book = "book",
  author = "author",
  user = "users",
  borrow = "borrow",
  donation = "donation",
  notification = "notification",
  profile = "profile"
}
export enum UI_ROUTES{
  //auth 
  SignIn = "/signin",
  SignUp = "/signup",
  //landing
  Landing="/",
  SingleBook="/SingleBook",
  BooksListing="/books",
  //account
  Profile="/account",
  MyShelf="/account/shelf",
  Remainders="/account/remainders",
  //admin
  Admin ="/admin",
  ManageBooks ="/admin/book",
  ManageAuthor ="/admin/author",
}

export const NavRoutes = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "ABOUT US",
    href: "/about",
  },
  {
    name: "BOOKS",
    href: "/books",
  },
  {
    name: "CONTACT US",
    href: "/contact",
  },
  {
    name: "BLOG",
    href: "/blog",
  }
];


