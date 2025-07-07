<template>
  <div class="home">
    <h2 class="title">ようこそ、KAの錬金工房へ！</h2>
    <p class="description">
      アトリエの魔法と情熱で創られたプロジェクトをご覧あれ
    </p>
    <div class="alchemy-section">
      <BubblePot />
      <img src="/images/kettle.png" alt="錬金釜" class="kettle" />
    </div>
    <AlchemistScene />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AlchemistScene from '@/components/AlchemistScene.vue';
import BubblePot from '@/components/BubblePot.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AlchemistScene,
    BubblePot,
  },
});
</script>

<style scoped>
.home {
  @apply text-center relative;
}

.title {
  @apply text-4xl font-bold text-[#4a90e2] mb-4;
}

.description {
  @apply text-lg text-[#6b4e71] mb-8;
}

.alchemy-section {
  @apply flex flex-col items-center relative gap-8;
}

.kettle {
  @apply w-[200px] relative z-[2];
}
</style>
