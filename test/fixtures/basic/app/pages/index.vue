<script setup lang="ts">
const xssAttack = `<p>Hello<script>alert('This is an XSS attack!')</` + `script> World</p><a target="_blank" href="/">a link</a>`
</script>

<template>
  <div v-sanitise-html="xssAttack" />
</template>
