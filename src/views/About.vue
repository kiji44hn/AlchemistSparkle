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
    <div class="background-stars"></div>
  </div>
  <div class="scene-area">
    <AlchemistScene />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import AlchemistScene from '@/components/AlchemistScene.vue';
import { gsap } from 'gsap';

export default defineComponent({
  name: 'About',
  components: {
    AlchemistScene,
  },
  setup() {
    onMounted(() => {
      const tl = gsap.timeline({ defaults: { duration: 1.2, ease: 'power3.out' } });

      // タイムラインにアニメーションを追加
      tl.from('.header', { opacity: 0, y: -50 }) // ヘッダーのフェードイン
        .from('.content', { opacity: 0, x: -80 }, '-=0.5') // コンテンツのスライドイン
        .from('.footer', { opacity: 0, y: 50 }, '-=0.5') // フッターのスライドイン
        .to('.background-stars div', { scale: 1.1, opacity: 0.8, stagger: 0.2 }); // 星々の動きを追加
    });

    return {};
  },
});
</script>

<style scoped>
.about {
  @apply p-10 text-center font-playfair relative;
}

.header {
  @apply text-[#4a90e2] text-4xl font-bold mb-6;
}

.content {
  @apply text-[#6b4e71] text-lg leading-6 border border-[#ffd700] p-5 rounded-lg shadow-md relative bg-white/70;
}

.content .sparkle {
  @apply w-10 h-10 bg-[url('/images/sparkle.png')] bg-center bg-no-repeat bg-contain absolute top-0 left-0;
  animation: sparkle-animation 2.5s infinite ease-in-out;
}

.footer {
  @apply text-[#ffd700] mt-8 text-lg bg-white/90 border-t border-[#ffd700] p-5;
}

.background-stars {
  @apply absolute w-full h-full top-0 left-0 bg-[url('/images/stars-background.png')] bg-cover bg-center opacity-50 flex flex-wrap;
}

/* カスタムアニメーション */
@keyframes sparkle-animation {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(30px, -30px) scale(1.3);
    opacity: 0.6;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
}

.scene-area {
  position: relative;
  bottom: 17rem;
  @apply mt-6;
}

nav a:hover {
  @apply scale-110 text-[#ffd700] transition-transform duration-300 ease-in-out;
}
</style>
