import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/*
Project Technology & Tool Assessment:

- Vite: Modern frontend build tool for fast development and optimized builds.
- React: UI library for building user interfaces.
- @vitejs/plugin-react-swc: Vite plugin for React using SWC (a fast JavaScript/TypeScript compiler).
- TypeScript: Strongly typed superset of JavaScript.
- Path: Node.js core module for handling file paths.
- React Router (inferred from previous context): For client-side routing/navigation.
- Supabase (inferred from your prompt): Backend-as-a-Service for authentication and database (PostgreSQL).
- Likely using ES Modules (import/export syntax).
- Project structure uses `@` alias for `src` directory for cleaner imports.

No other technologies/tools are directly visible from this file. 
Further assessment would require reviewing package.json and other source files.
*/

// https://vitejs.dev/config/

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
