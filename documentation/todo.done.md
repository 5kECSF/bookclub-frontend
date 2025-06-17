# finished tasks

## landing page

- Home page tasks
  - [x] use new home pages
  - [x] use titlebar of old & new rest etc
    - [x] make the underline & selected
- [] books listing page tasks
  - [x] fix sort by _id to createdAt
  - [x] finish filter, by: category, genres
  - [ ] add language & availability to api & add filter on frontend
- single book
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