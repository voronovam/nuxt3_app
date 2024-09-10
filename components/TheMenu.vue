<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useAuthStore} from '../store/auth.js';

const router = useRouter();

const { logUserOut } = useAuthStore();
const { isAuth } = storeToRefs(useAuthStore());

/*const logout = () => {
  logUserOut();
  router.push('/login');
};*/

</script>

<template lang="pug">
.the-menu
  .container
    .the-menu__body
      //TODO create routes
      nuxt-link(
        to="/"
      )
        TheLogo.the-menu__home-logo

      //
        nuxt-link(
          v-if="isAuth"
          @click="logout"
        ) logout

        nuxt-link(
          v-if="isAuth"
          to="/profile"
        ) profile

</template>

<style lang="sass">
.the-menu
  padding: 16px 0

  &__body
    display: flex
    justify-content: space-between
    align-items: flex-end


  &__home-logo
    width: 140px
    &:hover, &:focus-visible
      color: $color-accent-1

</style>
