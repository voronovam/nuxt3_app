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
  margin-bottom: 24px
  box-shadow: 0 2px 4px 0 $color-dark
  font-family: monospace

  &__body
    display: flex
    justify-content: space-between
    align-items: flex-end


  &__home-logo
    width: 140px
    &:hover, &:focus-visible
      color: $color-accent

</style>
