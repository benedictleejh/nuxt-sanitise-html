<script setup lang="ts">
const html = `<header>This should be stripped</header><span>This should remain</span><footer>This should be stripped</footer>`
</script>

<template>
  <div v-sanitise-html:removeHeaderAndFooter="html" />
</template>
