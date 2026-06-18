import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: 'base' must match your repository name for GitHub Pages.
// If you rename the repo, update this value.
export default defineConfig({
  plugins: [react()],
  base: "/actualizador-planner/",
  server: { open: true }
});
