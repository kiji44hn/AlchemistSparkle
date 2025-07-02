<template>
  <div class="home">
    <h2>ようこそ、KAの錬金工房へ！</h2>
    <p>アトリエの魔法と情熱で創られたプロジェクトをご覧あれ</p>
    <img src="/images/kettle.png" alt="錬金釜" class="kettle" />
    <div class="sparkle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { gsap } from 'gsap';

export default defineComponent({
  name: 'Home',
  mounted() {
    gsap.to('.sparkle', {
      x: 'random(-100, 100)',
      y: 'random(-100, 100)',
      scale: 1.5,
      opacity: 0,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
      stagger: 0.5,
    });
  },
});
</script>

<style scoped>
.home {
  @apply p-16 md:p-5 font-playfair text-center;
}
.home h2 {
  @apply text-[#4a90e2] text-4xl;
}
.home p {
  @apply text-[#6b4e71] text-xl mb-5;
}
.kettle {
  @apply w-[17rem] h-[17rem] mx-auto my-5; /* w-24 h-24をw-[17rem] h-[17rem]に変更 */
}
.sparkle {
  @apply w-12 h-12 bg-[url('/images/sparkle.png')] bg-center bg-no-repeat bg-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}
</style>