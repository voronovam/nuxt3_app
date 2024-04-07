<template lang="pug">
component.ui-icon(
  :is="icon"
  :style="`--uiIconSize: ${size}`"
)

</template>

<script setup lang="ts">
type Props = {
  size: number
  name: string
}
const props = withDefaults(defineProps<Props>(),{
  size: 16,
})

const icons: Record<string, Component> = {
  add: defineAsyncComponent(() => import('./assets/icons/add.svg?component')),
  delete: defineAsyncComponent(() => import('./assets/icons/delete-2.svg?component')),
  edit: defineAsyncComponent(() => import('./assets/icons/edit.svg?component')),
  back: defineAsyncComponent(() => import('./assets/icons/arrow-left.svg?component')),
}

const icon = computed(() => icons[props.name]);

</script>

<style lang="sass">
.ui-icon
  width: calc(var(--uiIconSize) * 1px)
  height: calc(var(--uiIconSize) * 1px)
</style>
