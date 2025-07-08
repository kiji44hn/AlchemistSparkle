<template>
  <div ref="sceneContainer" class="scene-container" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";

export default defineComponent({
  name: "PuniAndBarrelScene",
  setup() {
    const sceneContainer = ref<HTMLDivElement | null>(null);

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let stars: THREE.Points;
    let velocities: THREE.Vector3[] = [];
    const particleCount = 1000;

    const init = () => {
      // シーンとカメラの初期設定
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true }); // 背景を透過
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (sceneContainer.value) {
        sceneContainer.value.appendChild(renderer.domElement);
      }

      // 光源設定
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(5, 10, 7.5);
      scene.add(directionalLight);

      // 星々の設定
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      for (let i = 0; i < particleCount; i++) {
        vertices.push(
          (Math.random() - 0.5) * 50, // X座標
          (Math.random() - 0.5) * 30, // Y座標
          (Math.random() - 0.5) * 50  // Z座標
        );
        velocities.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.1, // X方向の速度
            (Math.random() - 0.5) * 0.1, // Y方向の速度
            (Math.random() - 0.5) * 0.1  // Z方向の速度
          )
        );
      }
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

      const textureLoader = new THREE.TextureLoader();
      const sparkleTexture = textureLoader.load("/images/sparkle.png");

      const material = new THREE.PointsMaterial({
        map: sparkleTexture, // テクスチャの適用
        size: 0.6,
        transparent: true,
        opacity: 0.9,
      });

      stars = new THREE.Points(geometry, material);
      scene.add(stars);

      // ぷにの画像を追加
      const puniTexture = textureLoader.load(
        "/images/puni_image.png",
        () => console.log("ぷにの画像読み込み成功"),
        undefined,
        (err) => console.error("ぷにの画像読み込みエラー:", err)
      );
      const puniMaterial = new THREE.SpriteMaterial({ map: puniTexture });
      const puni = new THREE.Sprite(puniMaterial);
      puni.position.set(15, -3, 5); // 右側、カメラ前方に配置
      puni.scale.set(4.5, 4.5, 4.5); // 大きさを調整
      scene.add(puni);

      // 樽の画像を追加
      const barrelTexture = textureLoader.load(
        "/images/barrel.png",
        () => console.log("樽の画像読み込み成功"),
        undefined,
        (err) => console.error("樽の画像読み込みエラー:", err)
      );
      const barrelMaterial = new THREE.SpriteMaterial({ map: barrelTexture });
      const barrel = new THREE.Sprite(barrelMaterial);
      barrel.position.set(-15, -3, 5); // 左側、カメラ前方に配置
      barrel.scale.set(6, 6, 6); // 大きさを調整
      scene.add(barrel);

      camera.position.z = 25; // カメラ位置を調整して全体が見えるようにする
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const positions = stars.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;
        positions[index] += velocities[i].x;
        positions[index + 1] += velocities[i].y;
        positions[index + 2] += velocities[i].z;

        // 境界判定：画面外に出たら反転
        if (positions[index] > 50 || positions[index] < -50) velocities[i].x *= -1;
        if (positions[index + 1] > 30 || positions[index + 1] < -30) velocities[i].y *= -1;
        if (positions[index + 2] > 50 || positions[index + 2] < -50) velocities[i].z *= -1;
      }
      stars.geometry.attributes.position.needsUpdate = true;

      renderer.setClearColor(new THREE.Color(0x2d004d)); // 濃い紫（Hex値：#2d004d）
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
  @apply absolute top-[-32px] w-full h-[75vh] overflow-hidden z-[-1];
}
</style>
