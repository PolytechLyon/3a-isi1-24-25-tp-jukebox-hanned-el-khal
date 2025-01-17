<template>
  <div>
    <h1>Jukebox</h1>
    <h2>Player</h2>
    <PlayerController
      :currentTrack="currentTrack"
      :isPlaying="isPlaying"
      :playbackMode="playbackMode"
      @toggle-play="togglePlay"
    />
    <MusicPlaylist
      :tracks="tracks"
      :currentTrackIndex="currentTrackIndex"
      @play-track="playTrack"
      @delete-track="deleteTrack"
    />
    <AddSongForm @add-track="addTrack" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AddSongForm from './components/AddTrackForm.vue';
import PlayerController from './components/PlayerController.vue';
import MusicPlaylist from './components/MusicPlaylist.vue';

// Variables globales
const tracks = ref([]);
const currentTrackIndex = ref(null);
const isPlaying = ref(false);
const playbackMode = ref('repeatList');

const currentTrack = computed(() =>
  currentTrackIndex.value !== null ? tracks.value[currentTrackIndex.value] : null
);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

const playTrack = (index) => {
  if (!tracks.value[index].broken) {
    currentTrackIndex.value = index;
    isPlaying.value = true;
  }
};

const deleteTrack = (index) => {
  tracks.value.splice(index, 1);
  if (currentTrackIndex.value === index) {
    currentTrackIndex.value = null;
    isPlaying.value = false;
  }
};

const addTrack = (track) => {
  tracks.value.push({ ...track, broken: false });
};
</script>
