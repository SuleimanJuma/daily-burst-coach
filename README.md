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
- **Context-based Auth**: Used React Context to manage authentication state globally, making it easy to protect routes and access user info anywhere.
- **ProtectedRoute Component**: Centralized route protection logic, ensuring only authenticated users can access sensitive pages.
- **Componentized UI**: Built reusable UI components (cards, buttons, forms, etc.) for consistency and maintainability.
- **Environment Handling**: Used `.env` for secrets, ensured it is git-ignored, and documented environment variable setup for Vercel.
- **Modern React Patterns**: Used hooks, functional components, and React Query for robust state/data management.

### Challenges Solved
- **Merge Conflicts**: Resolved complex merge conflicts in key files (App.tsx, Settings.tsx) and removed all duplicate/stray code.
- **Error-Free Build**: Iteratively fixed all compile and lint errors, ensuring a clean build and smooth deployment.
- **Authentication Flow**: Implemented a seamless login/signup/logout flow with Supabase, including fallback UI and route protection.
- **Settings Page**: Designed a modern, user-friendly settings page with profile, notification, learning, and privacy controls.
- **Deployment**: Provided clear guidance for Vercel deployment, including environment variable management and best practices.

---
