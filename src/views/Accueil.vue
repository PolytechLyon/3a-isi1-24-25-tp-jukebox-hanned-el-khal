<template>
  <div id="app">
    <h1>Jukebox</h1>
    <router-link to="/playlist">Manage playlists</router-link> <!-- Lien vers Playlist -->
    <h2>Currently Playing: {{ selectedPlaylist }}</h2>
    <!-- Ici, la vue change en fonction de la route -->
    <PlayerController
      :currentTrack="currentTrack"
      :isPlaying="isPlaying"
      @toggle-play="togglePlay"
      @skip-track="skipTrack"
    />
    <form>
      <fieldset class="container">
        <legend>Playback mode</legend>
        <label>
          <input type="radio" value="repeat-list" v-model="playbackMode" /> Repeat list
        </label>
        <label>
          <input type="radio" value="repeat-track" v-model="playbackMode" /> Repeat track
        </label>
        <label>
          <input type="radio" value="no-repeat" v-model="playbackMode" /> Don't repeat
        </label>
      </fieldset>
    </form>
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
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router"; // Importation de useRoute
import AddSongForm from "../components/AddSongForm.vue";
import PlayerController from "../components/PlayerController.vue";
import MusicPlaylist from "../components/MusicPlaylist.vue";

// Récupérer la playlist sélectionnée à partir des paramètres de la route
const route = useRoute();
const selectedPlaylist = route.query.playlist || "Default Playlist";

// Gestion des pistes
const tracks = ref([]);
const currentTrackIndex = ref(null);
const isPlaying = ref(false);
const playbackMode = ref("repeat-list"); // Modes : 'repeat-list', 'repeat-track', 'no-repeat'

const currentTrack = computed(() => {
  return currentTrackIndex.value !== null
    ? tracks.value[currentTrackIndex.value]
    : null;
});

// Charger la playlist depuis localStorage si elle existe
onMounted(() => {
  const savedTracks = JSON.parse(localStorage.getItem("playlist")) || [];
  tracks.value = savedTracks;
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
  if (playbackMode.value === "repeat-track" && direction === "next") {
    // Reste sur la même piste
    return;
  }

  if (direction === "next") {
    if (playbackMode.value === "repeat-list") {
      currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.value.length;
    } else if (currentTrackIndex.value + 1 < tracks.value.length) {
      currentTrackIndex.value += 1;
    } else {
      // Si pas en mode Repeat List, arrêter la lecture à la fin
      currentTrackIndex.value = null;
      isPlaying.value = false;
    }
  } else if (direction === "previous") {
    currentTrackIndex.value =
      (currentTrackIndex.value - 1 + tracks.value.length) % tracks.value.length;
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

  // Mettre à jour le localStorage après suppression
  localStorage.setItem("playlist", JSON.stringify(tracks.value));
};

const addTrack = (track) => {
  // Ajouter le morceau à la playlist
  tracks.value.push({ ...track, broken: false });

  // Sauvegarder les tracks dans localStorage
  localStorage.setItem("playlist", JSON.stringify(tracks.value));
};
</script>
