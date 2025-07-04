# Daily Burst Coach

## Project info

**URL**: https://yourdomain.com

## How can I edit this code?

There are several ways of editing your application.



**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. All changes are yours to keep!

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Deploy your app to your favorite platform and share it with the world!

## Custom Domain Setup

To set up a custom domain, follow your hosting provider's instructions.

---

## Case Study: Building Daily Burst Coach

### Problem Tackled

The goal was to create a modern, secure, and scalable learning platform for WhatsApp-based microlearning. The platform needed:
- User authentication and protected routes
- A dashboard with navigation and settings management
- Integration with Supabase for backend and authentication
- A clean, maintainable codebase with environment/config best practices

### Technologies Used
- **React** (with Vite) for the frontend
- **Supabase** for authentication and backend
- **React Router** for navigation and protected routes
- **TanStack React Query** for data fetching and caching
- **Tailwind CSS** for UI styling
- **Lucide React** for icons
- **Vercel** for hosting

### Architectural Decisions

- **Context-based Authentication (AuthContext):**
  - We created an `AuthContext` using React's Context API to manage authentication state (user, session, loading, signOut, signIn) globally. This avoids prop drilling and makes it easy to access auth state anywhere.
  - **Why:** Centralizes authentication logic, improves maintainability, and enables secure route protection.
  - **How to do it:**
    1. Create `src/contexts/AuthContext.tsx`.
    2. Use `createContext`, `useState`, and `useEffect` to manage user/session.
    3. Provide `signIn`, `signOut`, and `signUp` functions.
    4. Wrap your app in `<AuthProvider>` in `App.tsx`.
    5. Use `useContext(AuthContext)` in any component to access auth state.

- **ProtectedRoute Component:**
  - Built a `ProtectedRoute` component to guard private routes. It checks if the user is authenticated and either renders the protected page or redirects to the Auth page.
  - **Why:** Ensures only logged-in users can access sensitive pages (dashboard, settings, etc.).
  - **How to do it:**
    1. Create `src/components/ProtectedRoute.tsx`.
    2. Use `useContext(AuthContext)` to check auth state.
    3. Render children if authenticated, otherwise render `<Auth />`.
    4. Use `<ProtectedRoute>` in your router for all private routes.

- **Componentized, Reusable UI:**
  - Broke the UI into atomic, reusable components (Button, Card, Input, etc.) using shadcn-ui and Tailwind CSS.
  - **Why:** Promotes DRY code, consistent design, and rapid development.
  - **How to do it:**
    1. Create `src/components/ui/` for atomic UI elements.
    2. Use Tailwind for utility-first styling.
    3. Compose complex pages from these building blocks.
    4. Document props and usage for each component.

- **Supabase Integration:**
  - Used Supabase for authentication, database, and backend logic. All user data and auth flows are managed via Supabase’s client library.
  - **Why:** Supabase provides a secure, scalable, and developer-friendly backend with built-in RLS for data protection.
  - **How to do it:**
    1. Create a Supabase project and enable RLS.
    2. Store `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`.
    3. Initialize Supabase in `src/lib/supabaseClient.ts`.
    4. Use Supabase methods for signup, login, and CRUD operations.
    5. Write RLS policies to restrict data access by user.
    6. Test all auth and data flows for security.

- **Environment Variable Management:**
  - Used `.env` for all secrets and public keys, ensured `.env` is git-ignored, and documented how to set these in Vercel.
  - **Why:** Keeps secrets out of source control and makes deployment secure and portable.
  - **How to do it:**
    1. Add all keys to `.env` (prefix frontend keys with `VITE_`).
    2. Add `.env` to `.gitignore`.
    3. In Vercel, add the same variables in the dashboard.
    4. Document all required variables in the README.

- **Modern React Patterns & State Management:**
  - Used React hooks (`useState`, `useEffect`, `useContext`) and TanStack React Query for state and data management.
  - **Why:** Hooks simplify state and side-effect management. React Query handles async data, caching, and background updates.
  - **How to do it:**
    1. Use hooks for all local state and effects.
    2. Install React Query and wrap app in `<QueryClientProvider>`.
    3. Use `useQuery` for fetching, `useMutation` for updates.
    4. Use context for global state (auth, toasts, etc.).

- **Error Handling & User Feedback:**
  - Implemented robust error handling in all forms and async flows, with user-friendly messages and visual feedback (alerts, toasts, etc.).
  - **Why:** Improves UX, helps users recover from errors, and aids debugging.
  - **How to do it:**
    1. Use `try/catch` in all async functions.
    2. Store error/success messages in state.
    3. Show alerts or toasts for all important events.
    4. Handle both Supabase and network errors.
    5. Provide loading indicators for async actions.

- **Merge Conflict Resolution & Code Hygiene:**
  - Used git and VS Code to resolve all merge conflicts, removed duplicate code, and ensured only one version of each component exists.
  - **Why:** Prevents bugs, keeps codebase clean, and makes collaboration easier.
  - **How to do it:**
    1. Use `git status` and editor tools to find conflicts.
    2. Remove all conflict markers and duplicate code.
    3. Test the app after every merge.
    4. Run linter and formatter to keep code clean.

- **Scalable Routing Structure:**
  - Used React Router v6 to organize all pages and protected them with `ProtectedRoute`. Added a catch-all NotFound route.
  - **Why:** Makes navigation clear, maintainable, and secure.
  - **How to do it:**
    1. Install React Router.
    2. Define all routes in `App.tsx` using `<Routes>` and `<Route>`.
    3. Wrap private routes with `<ProtectedRoute>`.
    4. Add `<Route path="*" element={<NotFound />} />` for 404s.

- **UI/UX Design Principles:**
  - Focused on accessibility, responsiveness, and modern design using Tailwind CSS and shadcn-ui. Used icons (Lucide) and gradients for visual appeal.
  - **Why:** Ensures the app is usable, attractive, and works on all devices.
  - **How to do it:**
    1. Use semantic HTML and ARIA attributes.
    2. Test on mobile and desktop.
    3. Use Tailwind’s responsive utilities.
    4. Add focus states and keyboard navigation.

- **Security Best Practices:**
  - Enabled Supabase RLS, never exposed service keys, and validated all user input. Used HTTPS for all API calls.
  - **Why:** Protects user data and prevents unauthorized access.
  - **How to do it:**
    1. Enable RLS in Supabase and write strict policies.
    2. Only use anon/public keys in frontend.
    3. Validate and sanitize all user input.
    4. Use HTTPS endpoints everywhere.

- **Testing & Debugging:**
  - Manually tested all flows (signup, login, protected routes, settings, logout) and used browser dev tools for debugging.
  - **Why:** Ensures reliability and a smooth user experience.
  - **How to do it:**
    1. Test every user flow in the browser.
    2. Use Supabase dashboard to verify data.
    3. Check console for errors and fix them promptly.

- **CI/CD & Deployment:**
  - Used Vercel for continuous deployment. Every push to main triggers a new build and deploy. Documented the process for reproducibility.
  - **Why:** Automates deployment, ensures latest code is always live, and makes rollbacks easy.
  - **How to do it:**
    1. Connect GitHub repo to Vercel.
    2. Set up environment variables in Vercel.
    3. Push to main to trigger deploy.
    4. Monitor deployments in Vercel dashboard.

- **Documentation & Case Study:**
  - Wrote a comprehensive README with setup, development, architecture, deployment, and a case study. Included step-by-step guides and rationale for each decision.
  - **Why:** Makes the project accessible to all skill levels and helps future contributors.
  - **How to do it:**
    1. Document every major step and decision.
    2. Use clear language and code samples.
    3. Update docs as the project evolves.

---
