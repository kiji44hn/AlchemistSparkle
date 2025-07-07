// src/router/typings.d.ts
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string; // タイトルがオプションで存在する
  }
}
