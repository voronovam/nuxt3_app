<template lang="pug">
component.ui-icon(
  :is="icon"
  :style="props.size ? { '--ui-icon-size': `${props.size}px` } : null"
)
</template>

<script setup lang="ts">
type Props = {
  size?: number
  name: string
}

const props = defineProps<Props>()

const icons: Record<string, Component> = {
  add: defineAsyncComponent(() => import('./assets/icons/add.svg?component')),
  delete: defineAsyncComponent(() => import('./assets/icons/delete-2.svg?component')),
  edit: defineAsyncComponent(() => import('./assets/icons/edit.svg?component')),
  back: defineAsyncComponent(() => import('./assets/icons/arrow-left.svg?component')),
  vk: defineAsyncComponent(() => import('./assets/icons/vk.svg?component')),
}

const icon = computed(() => icons[props.name]);
</script>

<style lang="sass">
$size: var(--ui-icon-size, 16px)

.ui-icon
  flex-shrink: 0
  width: $size
  height: $size

</style>
