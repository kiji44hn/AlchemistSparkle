<template>
  <div>
    <audio ref="audio" :src="audioSrc" controls @timeupdate="updateVisualizer"></audio>
    <button @click="playAudio">再生</button>
    <button @click="pauseAudio">停止</button>
    <canvas ref="canvas" width="600" height="200"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audioSrc: '/emerald.mp3',
      audioContext: null,
      analyser: null,
      dataArray: null
    };
  },
  methods: {
    setupAudioContext() {
      if (!this.audioContext) {
        try {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const source = this.audioContext.createMediaElementSource(this.$refs.audio);
          this.analyser = this.audioContext.createAnalyser();
          source.connect(this.analyser);
          this.analyser.connect(this.audioContext.destination);
          this.analyser.fftSize = 256;
          this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        } catch (error) {
          console.error('AudioContextエラー:', error);
        }
      }
    },
    playAudio() {
      if (!this.audioContext) {
        this.setupAudioContext();
      }
      this.$refs.audio.play().catch(error => {
        console.error('再生エラー:', error);
      });
    },
    pauseAudio() {
      this.$refs.audio.pause();
    },
    updateVisualizer() {
      if (!this.analyser) return;
      this.analyser.getByteFrequencyData(this.dataArray);
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / this.dataArray.length) * 2.5;
      let x = 0;
      for (let i = 0; i < this.dataArray.length; i++) {
        const barHeight = this.dataArray[i] / 2;
        ctx.fillStyle = `hsl(${i * 2}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }
  }
};
</script>