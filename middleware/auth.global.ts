export default defineNuxtRouteMiddleware((to, from) => {
  if (to.name == "about") {
    return navigateTo("/");
  }
});
