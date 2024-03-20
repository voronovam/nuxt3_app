<template lang="pug">
p.empty-results {{ message }}
</template>

<script setup lang="ts">
defineProps({
  message: String,
});
</script>
