<!-- src/views/Projects.vue -->
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

<script>
export default {
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
      ],
    };
  },
};
</script>

<style>
.projects {
  padding: 30px;
}
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}
.recipe-card {
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}
.recipe-card:hover {
  transform: scale(1.05);
}
.recipe-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;
}
.recipe-card h3 {
  color: #4a90e2;
  font-family: 'Playfair Display', serif;
}
.recipe-card a {
  display: inline-block;
  margin-top: 10px;
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
}
</style>