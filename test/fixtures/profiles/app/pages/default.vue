<script setup lang="ts">
const h1h2string = `<h1>Hello</h1><h2>World</h2>`
</script>

<template>
  <div v-sanitise-html="h1h2string" />
</template>
