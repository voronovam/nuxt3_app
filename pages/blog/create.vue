<script setup lang="ts">
useHead({
  title: 'Create'
})

const form = reactive({
  title: '',
  content: '',
})

const router = useRouter()

const onSubmit = async () => {
  try {
    await $fetch('/api/blog', {
      method: 'POST',
      body: form,
    })

    router.push('/blog')
  } catch {
    console.log('Create error')
  }
}
</script>

<template lang="pug">
.create
  .container
    .create__back
      nuxt-link(to="/blog" title="back")
        UiIcon(name="back" :size="24")

    h1.create__headline Create

    form
      div
        label(for="title") Title
        input(
          v-model="form.title"
          type="text"
          id="title"
          name="title"
          placeholder="post title"
          required
        )

      div
        label(for="content") Content
        textarea(
          v-model="form.content"
          id="content"
          name="content"
          placeholder="post content"
          required
          rows="4"
        )

      button(
        @click.prevent="onSubmit"
      ) Submit

</template>

<style lang="sass">
.create
  &__back
    margin-bottom: 16px

  &__headline
    margin-bottom: 16px
</style>
