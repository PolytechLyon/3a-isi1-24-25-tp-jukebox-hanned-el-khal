<template>
  <div id="app">
    <h1>Playlists</h1>
    <router-link to="/">Back to player</router-link> <!-- Lien vers Playlist -->
        <!-- Ici, la vue change en fonction de la route -->
          <todo-list />
     <add-playlist />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AddPlaylist from '../components/AddPlaylist.vue';
import TodoList from "../components/TodoList.vue";


</script>