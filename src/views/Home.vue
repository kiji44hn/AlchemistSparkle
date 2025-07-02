<template>
  <div class="home">
    <h2>ようこそ、KAの錬金工房へ！</h2>
    <p>アトリエの魔法と情熱で創られたプロジェクトをご覧あれ</p>
    <img src="/images/kettle.png" alt="錬金釜" class="kettle" />
    <div id="three-canvas" ref="canvasRef"></div>
    <AudioPlayer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import AudioPlayer from '@/components/AudioPlayer.vue';

export default defineComponent({
  components: { AudioPlayer },
  setup() {
    const canvasRef = ref<HTMLDivElement | null>(null);

    const initThree = async () => {
      const THREE = await import('three');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
      if (canvasRef.value) canvasRef.value.appendChild(renderer.domElement);
      camera.position.z = 5;

      // パーティクル設定
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 100;
      const positions = new Float32Array(particlesCount * 3);
      const sizes = new Float32Array(particlesCount);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
        sizes[i / 3] = Math.random() * 0.5 + 0.1;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const textureLoader = new THREE.TextureLoader();
      const sparkleTexture = textureLoader.load('/sparkle.png');
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        map: sparkleTexture,
        transparent: true,
        alphaTest: 0.1,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    };

    initThree();

    return { canvasRef };
  },
});
</script>