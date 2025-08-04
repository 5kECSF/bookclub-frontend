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
  Stats = "stats",
  borrow = "borrow",
  donation = "donation",
  notification = "notification",
  profile = "profile"
}
export enum PlaceHolder{
  Dummy= "/assets/placeholder/dummy.png",
  Avatar= "/assets/placeholder/ava.png",
  BCLogoTransparent="/assets/bookClubLogo/logo.png",
  BCLogoFull="/assets/bookClubLogo/logo1.png"
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
  ManageDonations ="/admin/donation",
  ManageBorrow ="/admin/borrow",
  ManageUsers ="/admin/user",
}

export const NavRoutes = [
  { name: "HOME", active: true, url: "/" },
  { name: "Genres", active: true, url: "/genres" },
  { name: "NEW ARRIVAL", url: "/#newArrival" },
  { name: "Featured", url: "/#featured" },
  { name: "BOOKS", active: false, url: "/books" },
  // { name: "SingleBook", active: false, url: `${UI_ROUTES.SingleBook}` },
  // { name: "ABOUT US", active: false, url: "/#about" },
  { name: "CONTACT US", active: false, url: "/#contact-us" },
];


