<template>
  <div class="home">
    <h2>ようこそ、KAの錬金工房へ！</h2>
    <p>アトリエの魔法と情熱で創られたプロジェクトをご覧あれ</p>
    <img src="/images/kettle.png" alt="錬金釜" class="kettle" />
    <div ref="threeContainer" class="three-container"></div>
    <AlchemistScene />
    <AudioPlayer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import AlchemistScene from '@/components/AlchemistScene.vue';
import AudioPlayer from '@/components/AudioPlayer.vue';
import * as THREE from "three";

export default defineComponent({
  name: 'Home',
  components: {
    AlchemistScene,
    AudioPlayer,
  },
  setup() {
    const threeContainer = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      // Three.js初期設定
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (threeContainer.value) {
        threeContainer.value.appendChild(renderer.domElement);
      }

      // 粒子の作成
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      for (let i = 0; i < 500; i++) {
        vertices.push(
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 10 - 5
        );
      }
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // カメラ位置設定
      camera.position.z = 5;

      // アニメーション設定
      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.01; // 粒子の回転
        renderer.render(scene, camera);
      };
      animate();
    });

    return {
      threeContainer,
    };
  },
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}
.kettle {
  max-width: 200px;
  margin: 20px 0;
}
.three-container {
  width: 100%;
  height: 500px;
  overflow: hidden;
}
</style>
