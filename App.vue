<template>
  <div id="app">
    <h1>Jukebox</h1>

    <!-- Lien pour naviguer vers la page de gestion des playlists -->
    <router-link to="/manage-playlists">
      <button>Gérer les playlists</button>
    </router-link>

    <!-- Affichage de la vue active (selon la route) -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
</script>

