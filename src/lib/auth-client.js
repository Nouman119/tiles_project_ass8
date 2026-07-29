import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "https://tiles-project-ass8-git-main-nouman18.vercel.app",
});