<template>
  <div class="home">
    <h2>ようこそ、KAの錬金工房へ！</h2>
    <p>アトリエの魔法と情熱で創られたプロジェクトをご覧あれ</p>
    <div class="alchemy-section">
      <BubblePot />
      <img src="/images/kettle.png" alt="錬金釜" class="kettle" />
    </div>
    <AlchemistScene />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import AlchemistScene from '@/components/AlchemistScene.vue';
import BubblePot from '@/components/BubblePot.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AlchemistScene,
    BubblePot,
  },
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

.alchemy-section {
  display: flex;
  flex-direction: column;
  align-items: center; /* 子要素を中央揃え */
  gap: 20px; /* 錬金窯と泡間の間隔 */
  position: relative; /* 泡と窯が重なるように調整 */
}

.kettle {
  max-width: 200px;
  margin: auto;
  position: absolute;
  z-index: 1; /* 泡の手前に表示 */
}
.pot {
  margin-top: 80px; /* 錬金窯の下に位置を調整 */
}
</style>
