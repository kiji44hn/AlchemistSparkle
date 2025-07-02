<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h2>ようこそ、KAの錬金工房へ！</h2>
    <p>アトリエの魔法と情熱で創られたプロジェクトをご覧あれ</p>
    <img src="/images/kettle.png" alt="錬金釜" class="kettle" />
    <div class="sparkle"></div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
export default {
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
};
</script>

<style scoped>
.home {
  padding: 60px 20px;
  font-family: 'Playfair Display', serif;
  text-align: center;
}
.home h2 {
  color: #4a90e2;
  font-size: 2.2em;
}
.home p {
  color: #6b4e71;
  font-size: 1.2em;
  margin-bottom: 20px;
}
.kettle {
  width: 100px;
  height: 100px;
  margin: 20px auto;
}
.sparkle {
  width: 30px;
  height: 30px;
  background: url('/images/sparkle.png') no-repeat center;
  background-size: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>