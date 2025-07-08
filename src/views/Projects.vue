<template>
  <div class="projects">
    <h2 class="title">錬金プロジェクト一覧</h2>
    <p class="description fade-in">アトリエの魔法と情熱で創られたプロジェクトをご覧ください</p>
    <div class="recipe-grid">
      <div
        v-for="project in projects"
        :key="project.id"
        class="recipe-card"
      >
        <img :src="project.image" :alt="project.title" />
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <a :href="project.github" target="_blank">GitHubへ</a>
        <button @click="openModal(project)">詳細を見る</button>
      </div>
    </div>

    <!-- モーダル -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ selectedProject.title }}</h2>
        <img :src="selectedProject.image" :alt="selectedProject.title" />
        <p>{{ selectedProject.description }}</p>
        <a :href="selectedProject.github" target="_blank">GitHubへ</a>
        <button @click="closeModal">閉じる</button>
      </div>
    </div>
  </div>
  <div class="scene-area">
    <AlchemisetSceneProject />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlchemisetSceneProject from "@/components/AlchemisetSceneProject.vue";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
}

export default defineComponent({
  name: "Project",
  components: {
    AlchemisetSceneProject,
  },
  data() {
    return {
      projects: [
        {
          id: 1,
          title: "BreakPlayground",
          description: "Unityで織りなすエフェクトの秘薬。PostProcessとNiagaraで空間を彩る！",
          image: "/images/breakplayground.png",
          github: "https://github.com/kiji44hn/BreakPlayground",
        },
        {
          id: 2,
          title: "Fireworks",
          description: "Blenderで作る祭りの輝き。花火とサウンドが織りなす夏の記憶！",
          image: "/images/fireworks.png",
          github: "https://github.com/kiji44hn/Fireworks",
        },
        {
          id: 3,
          title: "CreativeEffectsLab",
          description: "Unreal Engineで挑む未知の技術。実験炉から生まれる新たなる効果！",
          image: "/images/creativeeffectslab.png",
          github: "https://github.com/kiji44hn/CreativeEffectsLab",
        },
      ] as Project[],
      showModal: false,
      selectedProject: {} as Project,
    };
  },
  methods: {
    openModal(project: Project) {
      this.selectedProject = project;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
</script>

<style scoped>
.projects {
  @apply text-center relative p-7;
}

.title {
  @apply text-4xl font-bold mb-6;
  background: linear-gradient(to right, #4a90e2, #ffd700, #6b4e71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  @apply text-lg text-[#6b4e71] mb-8 opacity-0;
  animation: fadeIn 2s forwards;
}

.recipe-grid {
  @apply grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6;
}

.recipe-card {
  @apply bg-white rounded-2xl p-5 shadow-lg shadow-black/10 transition-transform duration-300 hover:shadow-[#ffd700]/50;
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

.recipe-card button {
  @apply mt-3 bg-[#4a90e2] text-white rounded-full px-4 py-2 font-bold hover:bg-[#ffd700] transition-colors duration-300;
}

.modal {
  @apply fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center;
}

.modal-content {
  @apply bg-white p-7 rounded-xl shadow-lg relative text-center;
}

.modal-content img {
  @apply w-full rounded-xl mb-4;
}

.modal-content h2 {
  @apply text-[#4a90e2] text-2xl font-bold mb-2;
}

.modal-content a {
  @apply text-[#ffd700] font-bold no-underline block mt-2;
}

.modal-content button {
  @apply mt-4 bg-[#6b4e71] text-white rounded-full px-4 py-2 font-bold hover:bg-[#ffd700] transition-colors duration-300;
}

.scene-area {
  @apply mt-8;
  position: relative;
  bottom: 27rem;
}
</style>
