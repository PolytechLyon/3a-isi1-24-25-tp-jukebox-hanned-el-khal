<template>
  <div id="app">
    <h1>Playlists</h1>
    <router-link to="/">Back to player</router-link> <!-- Lien vers Playlist -->
        <!-- Ici, la vue change en fonction de la route -->
          <list />
     <add-playlist />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AddPlaylist from '../components/AddPlaylist.vue';
import List from "../components/List.vue";


</script>