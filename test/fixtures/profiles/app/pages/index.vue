<script setup lang="ts">
const targetBlankLink = `<a target="_blank" href="/">hello</a>`
</script>

<template>
  <div v-sanitise-html:safeTargetBlank="targetBlankLink" />
</template>
