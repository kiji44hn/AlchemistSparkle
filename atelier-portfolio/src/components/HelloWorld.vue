<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  msg: string;
}>();

const count = ref<number>(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++" class="count-btn">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="link"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      class="link"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
@layer components {
  .card {
    @apply mt-4;
  }
  .count-btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
  .link {
    @apply text-blue-500 hover:underline;
  }
  .read-the-docs {
    @apply mt-4 text-gray-500;
  }
}
</style>