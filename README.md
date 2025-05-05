# Next Js Admin pannel Template


> This is and admin dashboard with basic features
- authentication via httponly cookies
  - signup
  - signin
  - refresh token
  - logout()
- layout with responsive sidebar & dark and white themes
- crud pages with sing multi image upload
  - use ag grid table to display data
  - pagination
  - reusable filter sidebar
  - update url when filter query changes
  - queries displayed as removable chips
  - Independent single & multi image upload component
  - Create form with zod validation & auto error rendering


## Installation

Here are the steps you need to follow to install the dependencies.

1. Clone this repo

2. After that **cd** into the template directory then run this command to install all the dependencies

<<<<<<< HEAD
```bash
pnpm install
```
or
```bash
yarn install
```
3. make a `.env` file and copy the `NEXT_PUBLIC_BASE_URL=http://127.0.0.1:9001` to the actual servers url
4. Now run this command to start the developement server


```bash
pnpm dev
```
or

```bash
yarn dev
```

## Tasks


- [x] add page max & min filters
- [] add html renderer for descriptions with view button
- [] make the drafts page for creating books
- [] create a view modal for images



## Update Logs

### Version 1.0.1 - [Feb 26, 2024]

#### Issues
- **Issues 01:** the error in useQuery page from `logTrace` function & made it throw the error
#### Enhancements
- **Enhancement 01:** Make the url to be updated with the query & also to load initial state from url

### Version 1.0 - [Feb 25, 2024]

#### Issues
- **Issues 01:** Fix Axios errors not displayed correctly.
#### Enhancements


- **Enhancement 01:** Finished pagination
- **Enhancement 02:** Finished authentication using http only cookies
- **Enhancement 03:** Finished Authorization
- **Enhancement 04:** Finished filtering with filter Sidebar
- **Enhancement 04:** Add Default Layout Component and make App/Layout more clean and use it in every pages.


### Version 0.1.0 - Initial Release of tailAdmin - [Aug 3, 2023]

- Initial release of TailAdmin Next.

Powered by TailAdmin
