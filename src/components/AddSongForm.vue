<template>
  <div class="add-song">
    <h2>New track</h2>
    <select v-model="addMethod">
      <option value="url">By URL</option>
      <option value="file">By File</option>
    </select>
    
    <div v-if="addMethod === 'url'">
      <input v-model="songUrl" placeholder="Provide URL" />
      <button @click="addSongByUrl">Add by URL</button>
    </div>

    <div v-else>
      <input type="file" @change="handleFileUpload" />
      <button @click="addSongByFile">Add by File</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const addMethod = ref('url'); // Par défaut : ajout par URL
const songUrl = ref('');
const songFile = ref(null);

const emit = defineEmits(['add-track']);

const handleFileUpload = (event) => {
  songFile.value = event.target.files[0];
};

const addSongByUrl = () => {
  if (songUrl.value) {
    const newSong = {
      title: songUrl.value.split('/').pop(), // Utilise le dernier segment de l'URL comme titre
      artist: 'Unknown',
      url: songUrl.value,
    };
    emit('add-track', newSong);
    songUrl.value = '';
  }
};

const addSongByFile = () => {
  if (songFile.value) {
    const newSong = {
      title: songFile.value.name,
      artist: 'Unknown',
      url: URL.createObjectURL(songFile.value), // Crée un objet URL pour jouer le fichier
    };
    emit('add-track', newSong);
    songFile.value = null;
  }
};
</script>

<style scoped>
.add-song {
  margin-top: 20px;
}
</style>