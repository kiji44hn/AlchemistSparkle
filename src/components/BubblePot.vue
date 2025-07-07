<template>
  <div class="pot">
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "BubblePot",
  mounted() {
    gsap.to(".bubble", {
      scale: 1.5,
      opacity: 0.6,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
      x: "random(-30, 30)",
      y: "random(-50, 50)",
    });
  },
};
</script>

<style scoped>
.pot {
  @apply w-[200px] h-[200px] bg-green-400 rounded-full relative z-[2] mt-8;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5); /* 光のオーラを追加 */
}

.bubble {
  @apply w-[20px] h-[20px] bg-white/50 rounded-full absolute bottom-[20%] left-[50%] transform translate-x-[-50%];
}
</style>
