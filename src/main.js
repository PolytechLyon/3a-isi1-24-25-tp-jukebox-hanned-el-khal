import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';  // Assure-toi d'importer le routeur

const app = createApp(App);
app.use(router);  // Utilise le routeur
app.mount('#app');
