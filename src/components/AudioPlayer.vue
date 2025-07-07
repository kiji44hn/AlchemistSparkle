<template>
  <div>
    <!-- Audio Player Modal -->
    <div v-show="showModal" class="modal">
      <div class="modal-content">
        <audio ref="audio" :src="audioSrc" loop @timeupdate="onTimeUpdate"></audio>
        <div class="controls">
          <p>{{ toggleButtonLabel }}</p>
          <button
            class="toggle-button"
            @click="togglePlayPauseAndClose"
            :aria-label="toggleButtonLabel"
          >
            <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
          </button>
        </div>
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "AudioPlayer",
  setup() {
    const audioSrc = "/harunoyokan.mp3";
    const canvasWidth = 600;
    const canvasHeight = 200;
    const audio = ref<HTMLAudioElement | null>(null);
    const canvas = ref<HTMLCanvasElement | null>(null);
    const audioContext = ref<AudioContext | null>(null);
    const analyser = ref<AnalyserNode | null>(null);
    const dataArray = ref<Uint8Array | null>(null);

    let ctx: CanvasRenderingContext2D | null = null;
    let animationFrameId: number | null = null;
    const isPlaying = ref(false);
    const toggleButtonLabel = ref("再生 / 停止");
    const showModal = ref(true);

    const setupAudioContext = () => {
      if (audioContext.value || !audio.value) return;
      audioContext.value = new AudioContext();
      const source = audioContext.value.createMediaElementSource(audio.value);
      analyser.value = audioContext.value.createAnalyser();
      source.connect(analyser.value);
      analyser.value.connect(audioContext.value.destination);
      analyser.value.fftSize = 256;
      dataArray.value = new Uint8Array(analyser.value.frequencyBinCount);
    };

    const togglePlayPauseAndClose = async () => {
      if (!audioContext.value) setupAudioContext();
      if (audio.value) {
        try {
          await audioContext.value?.resume();
          if (isPlaying.value) {
            audio.value.pause();
            isPlaying.value = false;
          } else {
            await audio.value.play();
            isPlaying.value = true;
            showModal.value = false; // モーダルを閉じる
          }
        } catch (error) {
          console.error("音楽再生中にエラーが発生しました:", error);
        }
      }
    };

    const onTimeUpdate = () => {
      if (audio.value && audio.value.currentTime > 0) {
        console.log("現在の再生時間:", audio.value.currentTime);
      }
    };

    const updateVisualizer = () => {
      if (!analyser.value || !dataArray.value || !canvas.value || !ctx) return;
      analyser.value.getByteFrequencyData(dataArray.value);
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

      const barWidth = (canvas.value.width / dataArray.value.length) * 2.5;
      let x = 0;

      for (let i = 0; i < dataArray.value.length; i++) {
        const barHeight = dataArray.value[i] / 2;
        ctx.fillStyle = "#FFD700"; // Tailwind gold
        ctx.fillRect(x, canvas.value.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
      animationFrameId = requestAnimationFrame(updateVisualizer);
    };

    onMounted(() => {
      if (canvas.value) {
        ctx = canvas.value.getContext("2d");
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
      togglePlayPauseAndClose,
      onTimeUpdate,
      toggleButtonLabel,
      isPlaying,
      showModal,
    };
  },
});
</script>

<style scoped>
.modal {
  @apply fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-[10];
}

.modal-content {
  @apply bg-white p-5 rounded-lg shadow-lg w-[80%] max-w-[500px] relative text-center;
}

.audio-button-container {
  @apply flex justify-center mt-8;
}

.audio-button {
  @apply bg-[#4a90e2] text-white rounded-full p-4 hover:bg-[#ffd700] shadow-lg text-2xl;
}

canvas {
    display: none;
}
</style>
