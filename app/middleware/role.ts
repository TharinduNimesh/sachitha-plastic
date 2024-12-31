const roleRoutes = {
  Admin: [
    '/console',
    '/console/products',
    '/console/categories',
    '/console/inquiries',
    '/console/members',
    '/console/settings',
    '/console/feedback'
  ],
  Moderator: [
    '/console/products',
    '/console/categories',
    '/console/inquiries',
    '/console/settings'
  ]
} as const;

export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, role, fetchUser } = useAuthStore();

  // Check authentication first
  if (!isAuthenticated) {
    return navigateTo('/auth/sign-in');
  }

  // Fetch fresh user data
  const user = await fetchUser();
  if (!user) {
    console.error('User not found');
    return navigateTo('/auth/sign-in');
  }

  // Get allowed routes for user's role
  const allowedRoutes = roleRoutes[role as keyof typeof roleRoutes] || [];

  // Check if user can access the requested route
  const canAccess = allowedRoutes.some(route => to.path.startsWith(route));

  if (!canAccess) {
    console.warn(`Access denied: ${role} cannot access ${to.path}`);
    // Redirect to first allowed route for their role
    return navigateTo(allowedRoutes[0] || '/auth/sign-in');
  }
});