<script setup lang="ts">
const xssString = `Hello<script>alert('This is an XSS attack!')</` + `script>World`
</script>

<template>
  <h1 v-sanitise-html="xssString" />
</template>
