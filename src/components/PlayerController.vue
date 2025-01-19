<template>
  <div class="player-controller">
    <h2>Now Playing</h2>
    <div v-if="currentTrack">
      <p>{{ currentTrack.title }} </p>

      
      <audio ref="audioPlayer" :src="currentTrack.url" @timeupdate="updateProgress" @ended="onTrackEnded" @loadedmetadata="setDuration" />

      
      <div class="progress-bar-container">
        <input type="range" v-model="progress" :max="duration" @input="seekTrack" />
        <span>{{ formattedProgress }}</span>
      </div>

      
      <div>
        <button @click="togglePlay">{{ isPlaying ? 'Play' : 'Pause' }}</button>
        <button @click="skipTrack('previous')">Previous</button>
        <button @click="skipTrack('next')">Next</button>
      </div>
    </div>
    <div v-else>
      <p>Choose a track to play.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  currentTrack: Object,
  isPlaying: Boolean,
});

const emit = defineEmits(['toggle-play', 'skip-track']);

const audioPlayer = ref(null);
const progress = ref(0); // Progression actuelle (en secondes)
const duration = ref(0); // Durée totale de la chanson

// Format de la progression en minutes:secondes
const formattedProgress = computed(() => {
  const mins = Math.floor(progress.value / 60);
  const secs = Math.floor(progress.value % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
});

// Fonction pour jouer/mettre en pause la chanson
const togglePlay = () => {
  emit('toggle-play');
  if (audioPlayer.value) {
    if (props.isPlaying) {
      audioPlayer.value.play();
    } else {
      audioPlayer.value.pause();
    }
  }
};

// Fonction pour passer à la chanson précédente ou suivante
const skipTrack = (direction) => {
  emit('skip-track', direction);
};

// Mise à jour de la progression de la chanson
const updateProgress = () => {
  if (audioPlayer.value) {
    progress.value = audioPlayer.value.currentTime;
  }
};

// Rechercher une nouvelle position de lecture lorsque l'utilisateur déplace la barre de progression
const seekTrack = () => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = progress.value;
  }
};

// Mise à jour de la durée de la chanson au chargement de la piste
const setDuration = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration; // Définit la durée de la chanson
  }
};

// Lorsque la chanson se termine, passer à la suivante (si nécessaire)
const onTrackEnded = () => {
  skipTrack('next');
};

// Rechargement de la chanson à chaque changement de piste
watch(() => props.currentTrack, () => {
  if (audioPlayer.value && props.currentTrack) {
    audioPlayer.value.load(); // Recharge la chanson
    audioPlayer.value.play();
    duration.value = audioPlayer.value.duration; // Actualise la durée après le chargement
  }
});
</script>

<style scoped>
.player-controller {
  display: flex;
  flex-direction: column;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  width: 50%;
  margin-top: 10px;
}

input[type="range"] {
  width: 80%;
  margin-right: 10px;
}
</style>
