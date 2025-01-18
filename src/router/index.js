import { createRouter, createWebHistory } from 'vue-router'
import Playlist from '../views/Playlist.vue'
import Accueil from "../views/Accueil.vue"

const routes = [
  {
    path: '/',
    name: 'acceuil',
    component: Accueil,
  },
  {
    path: '/Playlist',
    name: 'playlist',
    component: Playlist
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
