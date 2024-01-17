import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to) => {
  const { isAuth } = storeToRefs(useAuthStore());
  const token = useCookie('token'); // get token from cookies

  if (token.value) {
    // check if value exists
    // todo verify if token is valid, before updating the state
    isAuth.value = true;
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'login') {
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo('/login');
  }
});
