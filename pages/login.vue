<template lang="pug">
.container
  div
    label(
      for="uname"
    )
      b Username

    input(
      v-model="user.username"
      type="text"
      placeholder="Enter Username"
      name="uname"
      required
    )

  div
    label(
      for="psw"
    )
      b Password

    input(
      v-model="user.password"
      type="password"
      placeholder="Enter Password"
      name="psw"
      required
    )

  button(
    @click.prevent="login"
    ) Login

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { authenticateUser } = useAuthStore();

const { isAuth } = storeToRefs(useAuthStore());

const user = ref({
  username: 'kminchelle',
  password: '0lelplR',
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);
  if (isAuth) {
    router.push('/');
  }
};
</script>
