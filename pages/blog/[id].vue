<script setup lang="ts">
import type { BlogModel } from '~/server/model/blog'

useHead({
  title: 'Update'
})

const form = reactive({
  title: '',
  content: '',
})

const route = useRoute()
const router = useRouter()

const onSubmit = async () => {
  try {
    await $fetch(`/api/blog/${route.params.id}`, {
      method: 'PUT',
      body: form,
    })

    router.push('/blog')
  } catch {
    console.log('Create error')
  }
}

const fetchData = async () => {
  try {
    const result = await $fetch(`/api/blog/${route.params.id}`)
    const data = result.data as BlogModel

    form.title = data.title
    form.content = data.content
  } catch {
    console.log('Create error')
  }
}

onMounted(() => fetchData())
</script>

<template lang="pug">
.detail
  .container
    nuxt-link(to="/blog" title="back") 🔙
    h1 Update post

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
