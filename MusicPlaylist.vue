/* eslint-disable */ 
<template>
  <div class="music-playlist">
    <h2>Playlist</h2>
    <ul>
      <li v-for="(track, index) in tracks" :key="index" :class="{ playing: index === currentTrackIndex }">
        <span>{{ track.title }} - {{ track.artist }}</span>
        <button @click="playTrack(index)">Play</button>
        <button @click="deleteTrack(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  tracks: Array,
  currentTrackIndex: Number
});

const emit = defineEmits(['play-track', 'delete-track']);

const playTrack = (index) => {
  emit('play-track', index);
};

const deleteTrack = (index) => {
  emit('delete-track', index);
};
</script>

<style scoped>
.music-playlist {
  margin-top: 20px;
}
.playing {
  font-weight: bold;
}
</style>
