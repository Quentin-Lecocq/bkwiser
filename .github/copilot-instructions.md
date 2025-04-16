# Technologies

- TypeScript
- React
- TanStack Router
- TanStack Query

# Instructions

This guide outlines **best practices** for building a **Vite / React** application using **TanStack Router** and **TanStack Query**.  
The main goals are **readability** and **maintainability**, minimizing abstraction to keep the codebase clear and approachable.  
Install new dependencies **only when they solve a real, specific problem**.

# Project Structure

We use a **flat and predictable** structure based on features.  
Each `feature` folder should contain all files related to that feature: components, hooks, backend functions, etc.  
This helps keep everything localized and easier to reason about.

```
/app
  /components # Reusable global components (Providers, App, NotFound, etc.)
    /ui # UI primitives (buttons, inputs, cards, etc.)
  /config # Project-level config (env vars, constants, etc.)
  /routes # File-based routing with TanStack Router
  /features # Feature folders (components, hooks, backend logic, etc.)
  client.tsx # Client entry point
  ssr.tsx # Server entry point for SSR
  router.tsx # Router setup and context
  routeTree.gen.ts # Generated route tree (do not edit manually)
```

# Rules

- Avoid generic folders like `helpers` or `utils`.
- Keep components close to where they are used.
- Favor **clear code over smart abstractions**.
- Prefer co-location: keep hooks, components, and logic together by feature.
