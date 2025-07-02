<script>
import { gsap } from 'gsap';
export default {
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
};
</script>
<template>
  <div class="about">
    <h2>自己紹介</h2>
    <p>私はKA。アトリエシリーズにインスパイアされたクリエイターです。Unity、Blender、Unreal Engineで魔法のような作品を作り、ポートフォリオに情熱を込めています！</p>
    <div class="sparkle"></div>
  </div>
</template>
<style scoped>
.about {
  padding: 40px;
  text-align: center;
  font-family: 'Playfair Display', serif;
}
.about h2 {
  color: #4a90e2;
  font-size: 2em;
}
.about p {
  color: #6b4e71;
  font-size: 1.1em;
  line-height: 1.6;
}
.sparkle {
  width: 20px;
  height: 20px;
  background: url('/images/sparkle.png') no-repeat center;
  background-size: contain;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>