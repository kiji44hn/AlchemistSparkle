<template>
  <div class="about">
    <h2>自己紹介</h2>
    <p>私はKA。アトリエシリーズにインスパイアされたクリエイターです。Unity、Blender、Unreal Engineで魔法のような作品を作り、ポートフォリオに情熱を込めています！</p>
    <div class="sparkle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { gsap } from 'gsap';

export default defineComponent({
  name: 'About',
  mounted() {
    gsap.to('.sparkle', {
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      scale: 1.5,
      opacity: 0,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
    });
  },
});
</script>

<style scoped>
.about {
  @apply p-10 text-center font-playfair;
}
.about h2 {
  @apply text-[#4a90e2] text-2xl;
}
.about p {
  @apply text-[#6b4e71] text-lg leading-6;
}
.sparkle {
  @apply w-5 h-5 bg-[url('/images/sparkle.png')] bg-center bg-no-repeat bg-contain absolute top-1/2 left-1/2;
}
</style>