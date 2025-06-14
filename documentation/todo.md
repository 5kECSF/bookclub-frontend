
# tasks

## Goals

- []

## current tasks

- [x] single page
  - [x] make Borrow requests if books availability count is greater than 1
- [] account page
  - [x] sidebar highlight
  - [ ] settings(profile & pwd)
    - [] change profile info: name, team, dept, phone no
      - [] make it work with zod
    - [] id image: use drop zone
    - [] hange pwd: test it with backend
    - [] change email: test it with backend
  - [] shelf
    - [] make book contents one list with query param
    - [] books to return
    - [] books requested
    - [] books donated
    - [] favorite
  - [] notification
    - [] book deadline reached
    - [] general notification
    - [] fix the notification to not show seen notifications

- [] admin 
  - [] users
    - [] list of users pending approval
  - borrow
    - [] make the books aproved
- api tasks
  - [] single book data: authors book data
  - users read & donated count

## fixes

- [x] remove filter on select all on book borrow
- [] update pagination component on admin
-

## Cleanup tasks

- make single about us & contuct us page: with mailTo link
- also add a faq section
- remove unused links:
  - Blog, Faqs, Terms of service
- cleanup footer

## finished tasks

- [x] stop the filter carry from one filter page to another
- [x] change the toast with sonner
- [] Home page integrations
  - [x] use new home pages
  - [x] use titlebar of old & new rest etc
    - [x] make the underline & selected
- [] books page tasks
  - [x] finish filter, by: category, genres
  - [ ] add language & availability to api & add filter on frontend
- Donations
  - [x] make the search filtering work for books & donors
- Borrow History
- [x] create a borrowing request with api
- [x] create tabs to display different states of borrowing state

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
- [ ] image with draft
  - [ ] Backend
    - [x] add status to the model & add the filter of status is active
    - return the body
    - [ ] add image name generator with jwt
  - [ ] frontend
    - [x] refactor the operate function
- [x] made a generic Modal For models with image
  - [x] made deleting work
  - [x] made updating work
  - [x] made updating images work
  - [x] made a generic FilterDrawer for all models
  -
- [x] write a documentation for code conventions

## Admin Side Tasks

- [] author
  - add the keys to filter
- [x] category
- [] book
  - [x] draft multi image upload api(x), frontend(x)
  - [x] multi image update:   api[x], frontend [x]
  - [] filter with page max min: api[], frontend[]
  - [] filter with author, api[], frontend[]
