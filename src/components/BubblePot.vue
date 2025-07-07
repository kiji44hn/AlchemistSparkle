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
  width: 200px;
  height: 200px;
  background-color: green;
  border-radius: 50%;
  position: relative;
  z-index: 1; /* 泡を錬金窯の下に配置 */
}

.bubble {
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
