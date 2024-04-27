import {
  authMiddleware,
  clerkMiddleware,
  createRouteMatcher,
  redirectToSignIn,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/select-org",
  "/organization/(.*)",
]);
console.log(isProtectedRoute, "isprotectedRoute");

export default clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) auth().protect();

    if (auth().userId && req.nextUrl.pathname === "/") {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
    if (auth().orgId) {
      NextResponse.redirect(req.url);
    }

    if (!auth().userId && isProtectedRoute(req)) {
      auth().redirectToSignIn({ returnBackUrl: req.url });
    }

    if (
      auth().userId &&
      !auth().orgId &&
      req.nextUrl.pathname !== "/select-org"
    ) {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
    // ({ returnBackUrl: afterSignInUrl});

    // if (auth()) {
    //         path = `/organizations/${auth.orgId}`;
    //       }
  },
  { debug: true }
);

// export default authMiddleware({
//   publicRoutes: ["/"],
//   afterAuth(auth, req) {
//     console.log(auth, "authhh");
//     if (auth.userId && auth.isPublicRoute) {
//       let path = "/select-org";

//       if (auth.orgId) {
//         path = `/organizations/${auth.orgId}`;
//       }

//       const orgSelection = new URL(path, req.url);
//       return NextResponse.redirect(orgSelection);
//     }

//     if (!auth.userId && !auth.isPublicRoute) {
//       //in case od bookbar or copy past url Direct
//       return redirectToSignIn({ returnBackUrl: req.url });
//     }

//     if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
//       const orgSelection = new URL("/select-org", req.url);
//       return NextResponse.redirect(orgSelection);
//     }
//   },
// });

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
