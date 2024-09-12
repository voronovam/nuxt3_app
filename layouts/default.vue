<template lang="pug">
.default-layout
  TheMenu

  main
    slot

  TheFooter

</template>

<style lang="scss">
.default-layout {
  display: grid;
  min-height: 100vh;
  grid-template-rows: max-content 1fr max-content;
}
</style>
