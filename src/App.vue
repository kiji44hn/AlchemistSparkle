<template>
  <div class="atelier-container">
    <header class="header">
      <h1>KAの錬金工房</h1>
      <nav>
        <router-link to="/">ホーム</router-link>
        <router-link to="/projects">プロジェクト</router-link>
        <router-link to="/about">自己紹介</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
      <AudioPlayer />
    </main>
    <footer>
      <p>© 2025 KA's Atelier</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { gsap } from "gsap";
import AudioPlayer from '@/components/AudioPlayer.vue';

export default defineComponent({
  name: 'App',
  components: {
    AudioPlayer,
  },
  setup() {
    onMounted(() => {
      // GSAPフェード効果を適用
      gsap.from(".header", {
        duration: 1, 
        opacity: 0, 
        y: -50, 
        ease: "power2.out"
      });
    });
  }
});
</script>

<style>
/* Tailwind CSSを使用 */
.atelier-container {
  @apply min-h-screen bg-gradient-to-b from-[#f8e1e9] to-[#d9e4f5] font-sans text-center;
}
header {
  @apply p-5 bg-white/90 border-b-4 border-[#ffd700];
}
h1 {
  @apply font-playfair text-[#4a90e2] text-4xl shadow-[1px_1px_2px_rgba(0,0,0,0.1)];
}
nav a {
  @apply mx-5 text-[#6b4e71] no-underline font-bold text-lg;
}
nav a:hover {
  @apply text-[#ffd700] transition-colors duration-300;
}
footer {
  @apply p-4 bg-[#6b4e71] text-white fixed bottom-0 w-[96.7vw] font-playfair;
}
</style>
