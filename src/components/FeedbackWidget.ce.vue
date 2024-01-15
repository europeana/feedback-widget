<script setup>
  defineProps({
    lang: 'en'
  })
</script>

<template>
  <div class="container py-4 px-3 mx-auto">
    <h1>Feedback Widget</h1>
    <p v-if="lang">lang: {{ lang }}</p>
  </div>
</template>

<style scoped lang="scss">
  @import 'bootstrap/scss/bootstrap';
</style>
