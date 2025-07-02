<template>
  <div class="audio-player">
    <audio ref="audio" :src="audioSrc" controls @timeupdate="onTimeUpdate"></audio>
    <div class="controls">
      <button @click="playAudio" :aria-label="playButtonLabel">再生</button>
      <button @click="pauseAudio" :aria-label="pauseButtonLabel">停止</button>
    </div>
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  setup() {
    const audioSrc = '/harunoyokan.mp3';
    const canvasWidth = 600;
    const canvasHeight = 200;
    const barColor = (hue: number) => `hsl(${hue}, 100%, 50%)`;

    const audio = ref<HTMLAudioElement | null>(null);
    const canvas = ref<HTMLCanvasElement | null>(null);
    const audioContext = ref<AudioContext | null>(null);
    const analyser = ref<AnalyserNode | null>(null);
    const dataArray = ref<Uint8Array | null>(null);

    let ctx: CanvasRenderingContext2D | null = null;
    let animationFrameId: number | null = null;

    const playButtonLabel = '音声を再生';
    const pauseButtonLabel = '音声を停止';

    const setupAudioContext = () => {
      if (!audioContext.value || !audio.value) {
        console.warn('AudioContextまたはaudio要素が利用できません');
        return;
      }

      try {
        audioContext.value = new AudioContext();
        const source = audioContext.value.createMediaElementSource(audio.value);
        analyser.value = audioContext.value.createAnalyser();
        source.connect(analyser.value);
        analyser.value.connect(audioContext.value.destination);
        analyser.value.fftSize = 256;
        dataArray.value = new Uint8Array(analyser.value.frequencyBinCount) as Uint8Array;
      } catch (error) {
        console.error('AudioContextエラー:', error);
        alert('音声処理に失敗しました。ブラウザの設定を確認してください。');
      }
    };

    const playAudio = () => {
      if (!audioContext.value) setupAudioContext();
      if (audio.value) {
        audio.value.play().catch(error => {
          console.error('再生エラー:', error);
          alert('再生に失敗しました。音声ファイルを確認してください。');
        });
      }
    };

    const pauseAudio = () => {
      if (audio.value) audio.value.pause();
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
        ctx.fillStyle = barColor(i * 2);
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
      playAudio,
      pauseAudio,
      onTimeUpdate,
      playButtonLabel,
      pauseButtonLabel,
    };
  },
});
</script>

<style scoped>
.audio-player {
  @apply min-h-[30vh] flex flex-col items-center justify-center p-4; /* min-h-screenをmin-h-[70vh]に変更 */
}
.controls {
  @apply flex gap-2 mt-6;
}
button {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400;
}
</style>