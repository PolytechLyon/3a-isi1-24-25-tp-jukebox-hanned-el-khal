<template>
  <ul>
    <h2>Playlist</h2>
    <li v-for="(track, index) in tracks" :key="index">
      <span :class="{ broken: track.broken, playing: index === currentTrackIndex }">
        {{ track.title }}
      </span>
      <a
        href="#"
        @click.prevent="playTrack(index)"
        :style="{ color: track.broken ? 'gray' : 'blue' }"
      >
        play
      </a>
      <a href="#" @click.prevent="deleteTrack(index)">delete</a>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps(['tracks', 'currentTrackIndex']);
const emit = defineEmits(['play-track', 'delete-track']);

const playTrack = (index) => {
  emit('play-track', index);
};

const deleteTrack = (index) => {
  emit('delete-track', index);
};
</script>

<style scoped>
.playing {
  font-weight: bold;
}
.broken {
  text-decoration: line-through;
}
</style>
