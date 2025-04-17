### Notes on Folder Structure

This project follows a **feature-based structure** designed for **readability** and **maintainability**. The structure is flat and predictable, making it easy to locate files and understand their purpose. Here's a high-level overview:

---

#### **Folder Structure**

```
/src
  /api # Backend API logic (waiting nest api)
    /routes # API route handlers
  /assets # Static assets (e.g., images, SVGs)
  /db # Database-related files (starting with lowdb)
  /features # Feature-specific folders (components, hooks, backend logic, etc.)
  /routes # Frontend routes with TanStack Router
  index.css # Global styles
  main.tsx # Client entry point
  routeTree.gen.ts # Generated route tree (do not edit manually)
  vite-env.d.ts # Vite environment types
```

---

#### **Key Principles**

1. **Feature-Based Organization**:

   - Each feature (e.g., `bankroll`, `bets`) has its own folder containing components, hooks, backend logic, and types.
   - This keeps related code localized and easier to maintain.

2. **Separation of Concerns**:

   - API logic, assets, database files, and features are clearly separated.
   - Frontend routes are organized under `/routes` for clarity.

3. **Flat and Predictable**:

   - Avoids unnecessary nesting, making the structure intuitive and easy to navigate.

4. **Reusability**:
   - Global components and utilities are designed to be reusable across the application.

---

#### **Best Practices**

- **Co-location**: Keep hooks, components, and logic together by feature.
- **Avoid Generic Folders**: No `helpers` or `utils` folders; everything has a clear purpose.
- **Clear Code Over Abstraction**: Prioritize readability and maintainability over complex abstractions.
- **Scalability**: The structure is designed to grow with the application without becoming unwieldy.

---

#### **Example Usage**

- A reusable button component for the `bankroll` feature would be placed in `/src/features/bankroll/components/balance-display.tsx`.
- API routes for `bets` are defined in `/src/api/routes/bets.routes.ts`.
- Frontend routes for `settings` are defined in `/src/routes/settings/profile.tsx`.

This structure ensures the application remains scalable, maintainable, and easy to navigate as it grows.
