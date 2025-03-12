
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([ '/dashboard(.*)',])


export default clerkMiddleware(async (auth, req) => {

  //check requested route is protected or not
  if (isProtectedRoute(req)) {
    // it check user is authenticat or not if yes --> redirect to requested route
    await auth.protect();
  }
})



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};