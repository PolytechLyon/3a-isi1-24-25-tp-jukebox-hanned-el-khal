<template>
  <div>
    <p v-if="currentTrack">
      Now playing: {{ currentTrack.title }}
      <a href="#" @click.prevent="togglePlay">{{ isPlaying ? 'pause' : 'play' }}</a>
    </p>
    <div v-else>
      <p>No track is playing</p>
    </div>
    <div>
      <h2>Playback mode</h2>
      <label>
        <input type="radio" v-model="playbackMode" value="repeatList" /> Repeat list
      </label>
      <label>
        <input type="radio" v-model="playbackMode" value="repeatTrack" /> Repeat track
      </label>
      <label>
        <input type="radio" v-model="playbackMode" value="noRepeat" /> Don't repeat
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps(['currentTrack', 'isPlaying', 'playbackMode']);
const emit = defineEmits(['toggle-play']);

const togglePlay = () => {
  emit('toggle-play');
};
</script>
