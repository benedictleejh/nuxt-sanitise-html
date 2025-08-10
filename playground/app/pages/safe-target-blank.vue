<script setup lang="ts">
const targetBlankString = `<a target="_blank" href="/">hello</a>`
</script>

<template>
  <h1 v-sanitise-html:safeTargetBlank="targetBlankString" />
</template>
