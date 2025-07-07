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
      // シーンとカメラの初期設定
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true }); // 背景透過
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (sceneContainer.value) {
        sceneContainer.value.appendChild(renderer.domElement);
      }

      // 星々の設定
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const particleCount = 1000; // 星の数を調整
      for (let i = 0; i < particleCount; i++) {
        vertices.push(
          (Math.random() - 0.5) * 10, // X座標
          (Math.random() - 0.5) * 10, // Y座標
          (Math.random() - 0.5) * 10  // Z座標
        );
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5, // 星のサイズ
      });

      stars = new THREE.Points(geometry, material);
      stars.position.set(0, 0, -10); // 星々を錬金窯に近づける
      scene.add(stars);

      // カメラ位置
      camera.position.z = 20;

      // 時計を初期化
      clock = new THREE.Clock();
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // 背景色の変更
      const hue = (elapsedTime * 20) % 360;
      renderer.setClearColor(new THREE.Color(`hsl(${hue}, 50%, 15%)`));

      // 星々を回転
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
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
