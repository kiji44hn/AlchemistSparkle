<template>
  <div class="projects">
    <h2>錬金プロジェクト一覧</h2>
    <div class="recipe-grid">
      <div v-for="project in projects" :key="project.id" class="recipe-card">
        <img :src="project.image" :alt="project.title" />
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <a :href="project.github" target="_blank">GitHubへ</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
}

export default defineComponent({
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'BreakPlayground',
          description: 'Unityで織りなすエフェクトの秘薬。PostProcessとNiagaraで空間を彩る！',
          image: '/images/breakplayground.png',
          github: 'https://github.com/kiji44hn/BreakPlayground',
        },
        {
          id: 2,
          title: 'Fireworks',
          description: 'Blenderで作る祭りの輝き。花火とサウンドが織りなす夏の記憶！',
          image: '/images/fireworks.png',
          github: 'https://github.com/kiji44hn/Fireworks',
        },
        {
          id: 3,
          title: 'CreativeEffectsLab',
          description: 'Unreal Engineで挑む未知の技術。実験炉から生まれる新たなる効果！',
          image: '/images/creativeeffectslab.png',
          github: 'https://github.com/kiji44hn/CreativeEffectsLab',
        },
      ] as const,
    };
  },
});
</script>

<style>
.projects {
  @apply p-7;
}
.recipe-grid {
  @apply grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6;
}
.recipe-card {
  @apply bg-white rounded-2xl p-5 shadow-lg shadow-black/10 transition-transform duration-300;
}
.recipe-card:hover {
  @apply scale-105;
}
.recipe-card img {
  @apply w-full h-40 object-cover rounded-xl;
}
.recipe-card h3 {
  @apply text-[#4a90e2] font-playfair;
}
.recipe-card a {
  @apply inline-block mt-2.5 text-[#ffd700] no-underline font-bold;
}
</style>