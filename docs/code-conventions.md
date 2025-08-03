# conventions

## coding styles

- try to keep all files under 100 lines
  - if a file is greater than, find a way to refactor it and break it down


## naming conventions

### General Principles:

- Be Descriptive: Names should clearly describe their purpose.
- Consistency: Stick to one style throughout your project.
- Avoid Abbreviations: Unless they're universally understood, avoid them to prevent confusion.

### Naming Conventions for Different Elements:
- File Names:
  - Pages/Components: Use `kebab-case` for React components and Next.js pages `(home-page.tsx, alert-modal.tsx)`.
    - the component Name should Be The pascal conversion of the kebab-case  `(alert-modal.tsx` should export--> `const AlertModal=()=>{})`
  - APIs/Routes: Use kebab-case (user-api.ts).
  - Utilities/Helpers: Use `camelCase` `(utils.ts, formatDate.ts)`.

### Function Names:
- Methods: Use camelCase (handleSubmit, fetchUserData).
- Async Functions: Prefix with `get` or `fetch` for clarity `(getUserInfo, fetchLatestPosts)`.

### Variable Names:
- State variables: Use `camelCase` `(userName, isLoading)`.
- Constants: Use `UPPER_SNAKE_CASE` `(MAX_USERS, API_URL)`.

### Class Names:
- Use `PascalCase` `(UserService, DatabaseConnection)`.

### Interface and Type Names:
- Use PascalCase `(IUser, UserProps)`. 
- Prefix interfaces with `'I'` for consistency.

### Folder/Path Structures:
- Components: components/
- Styles: styles/ or scss/ if using SCSS
- API: api/ or lib/api/
- Utilities: utils/ or lib/

### CSS/SCSS Classes:
- Use kebab-case (user-profile, nav-bar).

### Hooks:
Custom hooks should start with use and follow `camelCase` `(useUserProfile, useFetchData)`.

### Additional Considerations:
- Environment Variables: Use `UPPER_SNAKE_CASE` `(NEXT_PUBLIC_API_KEY)`.
- Enum Values: Use `PascalCase` `(enum Status { Active, Inactive })`.