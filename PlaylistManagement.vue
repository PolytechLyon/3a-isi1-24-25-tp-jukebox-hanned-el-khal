<template>
  <div>
    <h2>Gestion des playlists</h2>

    <!-- Liste des playlists -->
    <div v-for="(playlist, index) in playlists" :key="index">
      <span>{{ playlist.name }} ({{ playlist.tracks.length }} titres)</span>
      <button @click="selectPlaylist(index)">Sélectionner</button>
      <button @click="deletePlaylist(index)">Supprimer</button>
    </div>

    <!-- Formulaire de création de playlist -->
    <div>
      <input v-model="newPlaylistName" placeholder="Nom de la nouvelle playlist" />
      <button @click="createPlaylist">Créer une playlist</button>
    </div>

    <!-- Lien de retour à l'accueil -->
    <router-link to="/">
      <button>Retour à l'accueil</button>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const playlists = ref([]);
const newPlaylistName = ref('');

const selectPlaylist = (index) => {
  console.log('Playlist sélectionnée : ', playlists.value[index].name);
};

const deletePlaylist = (index) => {
  playlists.value.splice(index, 1);
};

const createPlaylist = () => {
  if (newPlaylistName.value.trim()) {
    playlists.value.push({ name: newPlaylistName.value, tracks: [] });
    newPlaylistName.value = ''; // Réinitialiser l'input
  } else {
    alert('Veuillez entrer un nom pour la playlist.');
  }
};
</script>
