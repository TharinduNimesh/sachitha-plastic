export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, fetchUser } = useAuthStore()

  if (!isAuthenticated) {
    return navigateTo('/auth/sign-in');
  }

  const user = await fetchUser();
  if (!user) {
    console.log('User not found');
    return navigateTo('/auth/sign-in');
  }

  if (to.path === '/auth/sign-in') {
    return navigateTo('/console');
  }
});
