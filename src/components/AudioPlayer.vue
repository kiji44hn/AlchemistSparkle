<template>
  <div class="audio-player">
    <audio ref="audio" :src="audioSrc" loop @timeupdate="onTimeUpdate"></audio>
    <div class="controls">
      <p>{{ toggleButtonLabel }}</p>
      <button class="toggle-button" @click="togglePlayPause" :aria-label="toggleButtonLabel">
        <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
      </button>
    </div>
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'AudioPlayer',
  setup() {
    const audioSrc = '/harunoyokan.mp3';
    const canvasWidth = 600;
    const canvasHeight = 200;
    const tailwindColors = ["#4a90e2", "#ffd700", "#6b4e71"];
    const barColor = (index: number) =>
      tailwindColors[index % tailwindColors.length]; // 循環的に色を使用

    const audio = ref<HTMLAudioElement | null>(null);
    const canvas = ref<HTMLCanvasElement | null>(null);
    const audioContext = ref<AudioContext | null>(null);
    const analyser = ref<AnalyserNode | null>(null);
    const dataArray = ref<Uint8Array | null>(null);

    let ctx: CanvasRenderingContext2D | null = null;
    let animationFrameId: number | null = null;
    const isPlaying = ref(false);

    const toggleButtonLabel = ref('再生 / 停止');

    const setupAudioContext = () => {
      if (audioContext.value || !audio.value) return;

      audioContext.value = new AudioContext();
      const source = audioContext.value.createMediaElementSource(audio.value);
      analyser.value = audioContext.value.createAnalyser();
      source.connect(analyser.value);
      analyser.value.connect(audioContext.value.destination);

      // データ配列を初期化
      analyser.value.fftSize = 256;
      dataArray.value = new Uint8Array(analyser.value.frequencyBinCount);
    };

    const togglePlayPause = () => {
      if (!audioContext.value) setupAudioContext();
      if (audio.value) {
        if (isPlaying.value) {
          audio.value.pause();
          isPlaying.value = false;
        } else {
          audio.value.play();
          isPlaying.value = true;
        }
      }
    };

    const onTimeUpdate = () => {
      if (audio.value && audio.value.currentTime > 0) {
        updateVisualizer();
      }
    };

    const updateVisualizer = () => {
      if (!analyser.value || !dataArray.value || !canvas.value || !ctx) return;

      analyser.value.getByteFrequencyData(dataArray.value);

      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

      const barWidth = (canvas.value.width / dataArray.value.length) * 2.5;
      let x = 0;

      for (let i = 0; i < dataArray.value.length; i++) {
        const barHeight = dataArray.value[i] / 2;
        ctx.fillStyle = barColor(i);
        ctx.fillRect(x, canvas.value.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      animationFrameId = requestAnimationFrame(updateVisualizer);
    };

    onMounted(() => {
      if (canvas.value) {
        ctx = canvas.value.getContext('2d');
        if (!ctx) {
          console.error('Canvasの2Dコンテキストを取得できません');
          return;
        }
      }
    });

    onUnmounted(() => {
      if (audioContext.value) {
        audioContext.value.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });

    return {
      audioSrc,
      audio,
      canvas,
      canvasWidth,
      canvasHeight,
      togglePlayPause,
      onTimeUpdate,
      toggleButtonLabel,
      isPlaying,
    };
  },
});
</script>

<style scoped>
.audio-player {
  @apply flex flex-col items-center justify-center p-5 min-h-[30vh];
}

.controls {
  @apply flex gap-4 mt-4;
  display: block;
}

.toggle-button {
  @apply bg-[#4a90e2] text-white rounded-full p-3 hover:bg-[#ffd700] shadow-md;
}

canvas {
  @apply mt-6 rounded-lg shadow-lg;
  display: none;
}
</style>
