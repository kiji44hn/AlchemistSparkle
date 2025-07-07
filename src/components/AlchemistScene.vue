<template>
  <div ref="sceneContainer" class="scene-container" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

export default defineComponent({
  name: 'AlchemistScene',
  setup() {
    const sceneContainer = ref<HTMLDivElement | null>(null);

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let stars: THREE.Points;
    let clock: THREE.Clock;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true }); // 背景透過
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (sceneContainer.value) {
        sceneContainer.value.appendChild(renderer.domElement);
      }

      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const particleCount = 1000;
      for (let i = 0; i < particleCount; i++) {
        vertices.push(
          (Math.random() - 0.5) * 20, // X座標を広げる
          (Math.random() - 0.5) * 20, // Y座標を広げる
          (Math.random() - 0.5) * 20  // Z座標を広げる
        );
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.6, // 星のサイズを微調整
      });

      stars = new THREE.Points(geometry, material);
      stars.position.set(0, 0, -15); // 星々をカメラ近くに配置
      scene.add(stars);

      camera.position.z = 30;
      clock = new THREE.Clock();
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // 背景色の変更
      renderer.setClearColor(new THREE.Color(`hsl(${elapsedTime * 10 % 360}, 50%, 15%)`));

      // 星々の回転
      stars.rotation.x += 0.001;
      stars.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    onMounted(() => {
      init();
      animate();
    });

    onUnmounted(() => {
      if (renderer) {
        renderer.dispose();
      }
    });

    return { sceneContainer };
  },
});
</script>

<style scoped>
.scene-container {
  @apply absolute top-[-64px] w-full h-screen overflow-hidden z-[-1];
}

canvas {
  @apply block w-full h-full relative top-[-7px] z-[-1];
}
</style>
