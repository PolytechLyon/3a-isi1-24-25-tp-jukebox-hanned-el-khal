/* eslint-disable */ 
<template>
  <div>
    <h2>Now Playing</h2>
    <p v-if="props.currentTrack">
      {{ props.currentTrack.title }} - {{ props.currentTrack.artist }}
    </p>
    <div>
      <!-- Barre de progression -->
      <input
        type="range"
        min="0"
        :max="duration"
        step="0.1"
        v-model="currentTime"
        @input="seekTrack"
      />
      <div>
        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
      </div>
    </div>
    <button @click="togglePlay">{{ props.isPlaying ? "Pause" : "Play" }}</button>
    <button @click="skipTrack('previous')">Previous</button>
    <button @click="skipTrack('next')">Next</button>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentTrack: Object,
  isPlaying: Boolean,
});

const emit = defineEmits(['toggle-play', 'skip-track']);

const audio = ref(new Audio());
const currentTime = ref(0);
const duration = ref(0);

// Formater le temps en "mm:ss"
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Mettre à jour la barre de progression
audio.value.addEventListener('timeupdate', () => {
  currentTime.value = audio.value.currentTime;
});

// Mettre à jour la durée totale
audio.value.addEventListener('loadedmetadata', () => {
  duration.value = audio.value.duration;
});

// Lire ou mettre en pause
const togglePlay = () => {
  if (props.isPlaying) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  emit('toggle-play');
};

// Rechercher une position spécifique
const seekTrack = () => {
  audio.value.currentTime = currentTime.value;
};

// Mettre à jour la piste actuelle
watch(
  () => props.currentTrack,
  (newTrack) => {
    if (newTrack) {
      audio.value.src = newTrack.url;
      audio.value.load();
      if (props.isPlaying) {
        audio.value.play();
      }
    }
  }
);

// Passer à la piste suivante ou précédente
const skipTrack = (direction) => {
  emit('skip-track', direction);
};
</script>
