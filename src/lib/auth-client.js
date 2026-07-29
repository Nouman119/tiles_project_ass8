import { createAuthClient } from "better-auth/react";


const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  return "https://tiles-project-ass8-git-main-nouman18.vercel.app";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});