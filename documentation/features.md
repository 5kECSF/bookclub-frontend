# Features built in this app

> these are general app features that are available in the application
>
## landing page featues

- [ ] HomePage
  - [x] categories
  - [x] genres
  - [] new arrival(latest) books
  - [] searching
  - [] banner page: manual
- listing page features
  - [x] sorting
  - [ ] filter sidebar: category, genres, author, languate
  - [x] filter chips
  - [x] responsive filter hiding
  - [x] list & grid views
- single book page
  - [x] Display book info & images
  - [ ] list authors books
  - [x] request to borrow book

## user profile page featues

- generic
  - [x] create new ui using shadn
- shelf page
  - [] books to return
  - [] books requested
    - [] cancle requested books
  - [] books donated
  - [] favorites(later)
- reminder page
  - [] book deadline reached
  - [] general notification
- settings
  - [] change profile info: name, team, dept, phone no
  - [] uploade id image
  - [] change pwd
  - [] change email



## admin page featues

- users
  - [] admin approve users
- borrow
  - [x] approve borrow requests
  - [ ] mark books as taken
  - [x] tabs for: requested, accepted, borrowed & returned books
  
## generice reusable layouts

- [x] page layout template : /components/admin/crud/page-layout.tsx
- [x] generic table
- [x] generic pagination
- [x] Query chips: chips that display the selected filters
- [x] TopButtons: Buttons for ModalOpen & FilterDrawer open
- [x] filter layout: with drawer that encapsulates filter
- [x] add-edit-layout template

## authentication & login

- [x] email login
- [] telegram login(later)
- [] google login(later)
