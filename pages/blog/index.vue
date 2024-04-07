<script setup lang="ts">
import type { BlogModel } from '~/server/model/blog'

useHead({
  title: 'Blog'
})

const data = ref<BlogModel[]>([])

const fetchData = async () => {
  try {
    const result = await $fetch('/api/blog')
    data.value = result.data as BlogModel[]

  } catch {
    console.warn('Fetch error')
  }
}

const onDelete = async (id: number) => {
  try {
    await $fetch(`/api/blog/${id}`, {
      method: 'DELETE'
    })
    await fetchData()

  } catch {
    console.warn('Delete error')
  }
}

onMounted(() => fetchData())
</script>

<template lang="pug">
.blog
  .container
    .blog__head
      h1 Blog
      nuxt-link(to="/blog/create" title="Create post")

        UiIcon(
          name="add"
          :size="48"
        )

    ul(v-if="data.length")
      li.blog__post(v-for="post in data" :key="post.id")
        h2 {{ post.title }}
        p {{ post.content }}

        nuxt-link(:to="`/blog/${post.id}`" title="Edit")
          UiIcon(name="edit")

        button(@click="onDelete(post.id)" title="Remove")
          UiIcon(name="delete")

    div(v-else)
      p No posts

</template>

<style lang="sass">
.blog
  &__head
    display: flex
    grid-gap: 16px
    align-items: center

  &__post:not(:first-child)
    margin-top: 12px
</style>
