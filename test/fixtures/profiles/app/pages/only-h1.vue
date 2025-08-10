<script setup lang="ts">
const html = `<p>Hello World</p><a target="_blank" href="/">a link</a><h1>My World</h1>`
</script>

<template>
  <div v-sanitise-html:onlyH1="html" />
</template>
