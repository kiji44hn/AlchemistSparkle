import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import About from '../views/About.vue';

// 各ルートにmetaフィールドを追加
const routes: RouteRecordRaw[] = [
  { path: '/', component: Home, meta: { title: 'ホーム | 錬金工房' } },
  { path: '/projects', component: Projects, meta: { title: 'プロジェクト | 錬金工房' } },
  { path: '/about', component: About, meta: { title: '自己紹介 | 錬金工房' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ページタイトルを動的に設定
router.afterEach((to) => {
  document.title = to.meta?.title || 'KAの錬金工房';
});

export default router;
