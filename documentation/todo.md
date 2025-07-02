
# tasks

## admin page tasks

- admin generic

  - [ ] list of over due books: borrow & donation
    - [ ] overdue api
  - [ ] books: featured, new arrival
  - [ ] create tabs for donations: available, taken
  - [x] update the logo {cm:2025-07-01}
  - [x] update the dropdown links {cm:2025-06-28}
  - [x] update pagination component on admin {cm:2025-06-28}
  - [x] update notification to work

- [] admin notification {c}
  - [] book deadline reached
  - [x] send general notification
  - [x] fix the notification to not show seenn notifications(on backend)
  - [ ] send notification to specific users
    - [ ] on account page, fetch notifications sent to the user & general notifications
    - [ ] make a query that fetch general notifications or notifications to that user
  - [ ] 
  
## landing page takss

- home page tasks {c}
  - [ ] fix the authors section
  - [ ] new arrival books: when a new book is Donated(books sorted by created at)
  - [ ] featured section: makr books as featured
    - [ ] mark book as featured #api

- listing page {c}
  - [] add move to single on click
- single page tasks

  - [] book cleanup
- generic tasks
  - []remove the still not sure page:
  - [] fix footer & navbar items(remove unused)
  - [] cleanup
  
### Generic tasks

- [ ] make single about us & contuct us page: with mailTo link
- [ ] also add a faq section
- [ ] remove unused links:
  - Blog, Faqs, Terms of service
- [ ] cleanup footer
- [ ] fix notification icon on the admin side
- [ ] clean up the admin template: remove unused
  - Logo, search, msg, sidebar: profile, settings, auth
- if user is logged in remove from auth page

## api tasks

- [] single book data: authors book data
- [x] url for borrow

--------------------------------------------------

## Later Tasks

## profile page tasks

- [] settings(profile & pwd)
  - [x] update email: test it with backend
  - [ ] id image: use drop zone
- reminders {c}
  - []
- admin books
  - [] filter with page max min: api[], frontend[]
  - [] filter with author
- [ ] add image name generator with jwt
- fav for users
