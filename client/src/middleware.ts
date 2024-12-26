export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/all-features",
    "/chat",
    "/history",
    "/history/(.*)",
    "/upload",
    "/",
  ],
};
