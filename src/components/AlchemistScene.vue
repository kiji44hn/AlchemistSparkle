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
    let particles: THREE.Points;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
      if (sceneContainer.value) {
        sceneContainer.value.appendChild(renderer.domElement);
      }

      const textureLoader = new THREE.TextureLoader();
      const sparkleTexture = textureLoader.load('/images/sparkle.png'); // テクスチャを追加

      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 200;
      const positions = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.3, // テクスチャに適したサイズに調整
        map: sparkleTexture, // テクスチャを適用
        transparent: true,
        opacity: 0.8,
        alphaTest: 0.1, // 透明部分を正しく表示
      });

      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      camera.position.z = 5;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      if (particles) {
        particles.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };

    onMounted(() => {
      init();
      animate();
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
      });
    });

    onUnmounted(() => {
      window.removeEventListener('resize', () => {});
      if (renderer) renderer.dispose();
    });

    return { sceneContainer };
  },
});
</script>

<style scoped>
.scene-container {
  width: 100%;
  height: 50vh;
}
</style>