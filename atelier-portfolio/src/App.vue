<!-- src/App.vue -->
<template>
  <div class="atelier-container">
    <header>
      <h1>KAの錬金工房</h1>
      <nav>
        <router-link to="/">ホーム</router-link>
        <router-link to="/projects">プロジェクト</router-link>
        <router-link to="/about">自己紹介</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>© 2025 KA's Atelier</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&family=Playfair+Display:wght@400;700&display=swap');

.atelier-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8e1e9, #d9e4f5);
  font-family: 'M PLUS Rounded 1c', sans-serif;
  text-align: center;
}
header {
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 3px solid #ffd700;
}
h1 {
  font-family: 'Playfair Display', serif;
  color: #4a90e2;
  font-size: 2.8em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
nav a {
  margin: 0 20px;
  color: #6b4e71;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;
}
nav a:hover {
  color: #ffd700;
  transition: color 0.3s;
}
footer {
  padding: 15px;
  background: #6b4e71;
  color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-family: 'Playfair Display', serif;
}
</style>