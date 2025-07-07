<template>
  <div class="about">
    <header class="header">自己紹介</header>
    <div class="content">
      <p>
        私はKA。アトリエシリーズにインスパイアされたクリエイターです。Unity、Blender、Unreal Engineで魔法のような作品を作り、ポートフォリオに情熱を込めています！
      </p>
      <div class="sparkle"></div>
    </div>
    <footer class="footer">錬金工房の世界をお楽しみください。</footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { gsap } from 'gsap';

export default defineComponent({
  name: 'About',
  setup() {
    onMounted(() => {
      const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } });

      // タイムラインにアニメーションを追加
      tl.from('.header', { opacity: 0, y: -50 }) // ヘッダーのフェードイン
        .from('.content', { opacity: 0, x: -100 }, '-=0.5') // コンテンツのスライドイン
        .from('.footer', { opacity: 0, y: 50 }, '-=0.5'); // フッターのスライドイン
    });

    return {};
  },
});
</script>

<style scoped>
.about {
  @apply p-10 text-center font-playfair;
}
.header {
  @apply text-[#4a90e2] text-3xl mb-4;
}
.content {
  @apply text-[#6b4e71] text-lg leading-6 relative;
}
.content .sparkle {
  @apply w-10 h-10 bg-[url('/images/sparkle.png')] bg-center bg-no-repeat bg-contain absolute top-0 left-0;
  animation: sparkle-animation 2s infinite ease-in-out;
}
.footer {
  @apply text-[#ffd700] mt-10;
}

/* カスタムアニメーション */
@keyframes sparkle-animation {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(30px, 30px) scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
}
</style>
