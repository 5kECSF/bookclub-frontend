# finished tasks

## landing page

- Home page tasks
  - [x] use new home pages
  - [x] use titlebar of old & new rest etc
    - [x] make the underline & selected
- [x] books listing page tasks
  - [x] fix sort by _id to createdAt
  - [x] finish filter, by: category, genres
  - [ ] add language & availability to api & add filter on frontend
- [x] single book
  - [x] make Borrow requests button if books availability count is greater than 1

## profile page

- [ ] shelf
  - [x] make book contents one list with query param
- generic
  - [x] sidebar highligh
  - [x] sidebar from shadncn(or from ai)

## admin page

- [x] stop the filter carry from one filter page to another
- [x] change the toast with sonner
- [] book
  - [x] draft multi image upload api(x), frontend(x)
  - [x] multi image update:   api[x], frontend [x]
- Donations
  - [x] make the search filtering work for books & donors
- Borrow History
  - [x] create a borrowing request with api
  - [x] borrow transactions
  - Admin accept borrow
    - [x] update borrow model {status,uid,instanceId,instance No}
    - [x] update donation model {status, borrower Id,borrowerName }
    - [x] update book instance and book count
    - [x] send notification to user with message {book Name, userId}
  - [x] create tabs to display different states of borrowing state
  - [x] remove filter on select all on book borrow
  - [ ]Admin mark book Taken
    - [x] update borrow model {taken date, duedate, note, status}
    - [x] update book Instance {status}
    - [x] send Notification To the User
- author
  - [x] make it use slug

## api Tasks

- .

## Generic tasks

- [x] deploy the app
- [x] finish auth
  - [x] connect the signup
  - [x] connect the activate
  - [x] connect the login
  - [x] connect the refresh token
- [x] finish multi image upload component and create book
- [x] connect the genere crud app
- [x] integrate the frontend ui code
- [x] image with draft
  - [ ] Backend
    - [x] add status to the model & add the filter of status is active
    - return the body

  - [ ] frontend
    - [x] refactor the operate function
- [x] made a generic Modal For models with image
  - [x] made deleting work
  - [x] made updating work
  - [x] made updating images work
  - [x] made a generic FilterDrawer for all models
  -
- [x] write a documentation for code conventions


  
### make generic templates

- [x] page layout template : /components/admin/crud/page-layout.tsx
  - table
  - [x] pagination
  - [x] Query chips: chips that display the selected filters
  - [x] TopButtons: Buttons for ModalOpen & FilterDrawer open
- [x] filter layout: template with drawer that encapsulates filter
- [x] add-edit-layout template
  


- [x] authorization for profile page {cm:2025-06-17}
  - [x] fix queries of requested, accepted,borrowed Returned
  - [ ] fix content of cards, for each status {cm:2025-06-17}
- [x] shelf {c} {cm:2025-06-22}
  - [x] fix content of cards {cm:2025-06-22}
  - [x] fix img url of cards {cm:2025-06-22}
  - [x] make cancle borrow reqest button {cm:2025-06-22}
  - [x] fix Stat cards {cm:2025-06-22}
  - [x] fix display of donation card {cm:2025-06-22}
  - [ ] change profile info: name, team, id no, dept, phone no {cm:2025-06-25}
    - [] make it work with zod {cm:2025-06-25}
  - [ ] change pwd: test it with backend {cm:2025-06-25}
- [x] forgot pwd page {cm:2025-06-25}
- settings(profile & pwd) {cm:2025-06-28}
- [x] users {cm:2025-06-28}
  - [x] list of users pending approval {cm:2025-06-28}
- home page tasks {cm:2025-07-03}
  - [x] fix the authors section {cm:2025-07-03}
  - [x] new arrival books: when a new book is Donated(books sorted by created at) {cm:2025-07-03}
  - [x] featured section: makr books as featured {cm:2025-07-03} {c}
    - [x] mark book as featured #api {cm:2025-07-03}
- listing page {cm:2025-07-03}
  - [x] add move to single on click {cm:2025-07-03}
- [x] remove unused links: {cm:2025-07-03}
  - Blog, Faqs, Terms of service {cm:2025-07-03}
- [x] cleanup footer {cm:2025-07-03}
- admin generic {cm:2025-07-03}
  - [x] list of over due books: borrow & donation {cm:2025-07-03}
    - [x] overdue api {cm:2025-07-03}
  - [x] books: featured, new arrival {cm:2025-07-03}
  - [x] update the logo {cm:2025-07-01}
  - [x] update the dropdown links {cm:2025-06-28}
  - [x] update pagination component on admin {cm:2025-06-28}
  - [x] update notification to work {cm:2025-07-03}
- [x] fix notification icon on the admin side {cm:2025-07-03}
- [x] fix footer & navbar items(remove unused) {cm:2025-07-03}
  - [x] cleanup {cm:2025-07-03}
- generic tasks {cm:2025-07-03}
  - []remove the still not sure pages: {cm:2025-07-03}
- [x] url for borrow {cm:2025-07-03}
- single book page tasks {cm:2025-07-03}
  - [x] book bottom tabs cleanup {cm:2025-07-03}
  - [x] fetching related books via category and genres {cm:2025-07-03}
  - [x] about author from api & authors books {cm:2025-07-03}
    - [x] filter out the current book {cm:2025-07-03}
  - [x] request to borrow for unlogged in users {cm:2025-07-03}
  - [x] make the share feature {cm:2025-07-03}
- [x] make search feature work {cm:2025-07-03}
- [x] single book data: authors book data {cm:2025-07-03}

- [x] remainders
  - [x] fetching overdue books & requested books {cm:2025-07-04}
  - [x] fetching notifications for the user {cm:2025-07-04}