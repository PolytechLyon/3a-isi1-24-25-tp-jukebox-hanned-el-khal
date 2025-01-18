<template>
  <div class="player-controller">
    <h2>Now Playing</h2>
    <div v-if="currentTrack">
      <p>{{ currentTrack.title }} - {{ currentTrack.artist }}</p>
      <audio ref="audioPlayer" :src="currentTrack.url" controls autoplay></audio>
      <div>
        <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
        <button @click="skipTrack('previous')">Previous</button>
        <button @click="skipTrack('next')">Next</button>
      </div>
    </div>
    <div v-else>
      <p>No track playing</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  currentTrack: Object,
  isPlaying: Boolean,
});

const emit = defineEmits(['toggle-play', 'skip-track']);

const audioPlayer = ref(null);

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

const skipTrack = (direction) => {
  emit('skip-track', direction);
};

// Reprend automatiquement la lecture quand la piste change
watch(() => props.currentTrack, () => {
  if (audioPlayer.value && props.currentTrack) {
    audioPlayer.value.load(); // Recharge l'audio
    audioPlayer.value.play();
  }
});
</script>

<style scoped>
.player-controller {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
