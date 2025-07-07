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
      opacity: 0,
      repeat: -1,
      yoyo: false,
      duration: 2.5,
      ease: "sine.inOut",
      x: "random(-50, 50)",
      y: "random(-50, 50)",
    });
  },
};
</script>

<style scoped>
.pot {
  @apply w-[200px] h-[200px] bg-green-500 rounded-full relative z-[1];
}

.bubble {
  @apply w-[20px] h-[20px] bg-white/80 rounded-full absolute bottom-[20%] left-[50%] transform translate-x-[-50%];
}
</style>
