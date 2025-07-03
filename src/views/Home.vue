<template>
  <div class="home">
    <h2>ようこそ、KAの錬金工房へ！</h2>
    <p>アトリエの魔法と情熱で創られたプロジェクトをご覧あれ</p>
    <img src="/images/kettle.png" alt="錬金釜" class="kettle" />
    <AlchemistScene />
    <AudioPlayer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AlchemistScene from '@/components/AlchemistScene.vue';
import AudioPlayer from '@/components/AudioPlayer.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AlchemistScene,
    AudioPlayer,
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
</style>