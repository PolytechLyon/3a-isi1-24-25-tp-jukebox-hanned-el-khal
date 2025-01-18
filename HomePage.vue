<template>
  <div>
    <h2>Lecteur de musique</h2>

    <!-- Afficher les composants du lecteur de musique -->
    <PlayerController
      :currentTrack="currentTrack"
      :isPlaying="isPlaying"
      @toggle-play="togglePlay"
      @skip-track="skipTrack"
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
import PlayerController from './components/PlayerController.vue';
import MusicPlaylist from './components/MusicPlaylist.vue';
import AddSongForm from './components/AddSongForm.vue';

const tracks = ref([]);
const currentTrackIndex = ref(null);
const isPlaying = ref(false);

const currentTrack = computed(() => {
  return currentTrackIndex.value !== null ? tracks.value[currentTrackIndex.value] : null;
});

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

const playTrack = (index) => {
  if (!tracks.value[index].broken) {
    currentTrackIndex.value = index;
    isPlaying.value = true;
  }
};

const skipTrack = (direction) => {
  if (direction === 'next') {
    currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.value.length;
  } else if (direction === 'previous') {
    currentTrackIndex.value = (currentTrackIndex.value - 1 + tracks.value.length) % tracks.value.length;
  }
};

const deleteTrack = (index) => {
  tracks.value.splice(index, 1);
  if (currentTrackIndex.value === index) {
    currentTrackIndex.value = null;
    isPlaying.value = false;
  } else if (currentTrackIndex.value > index) {
    currentTrackIndex.value -= 1;
  }
};

const addTrack = (track) => {
  tracks.value.push(track);
};
</script>
