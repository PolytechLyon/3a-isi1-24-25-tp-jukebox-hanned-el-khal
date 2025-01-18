<template>
  <div id="app">
    <h1>Jukebox</h1>
    <router-link to="/playlist">Manage playlists</router-link> <!-- Lien vers Playlist -->
    <h2>Currently Playing: {{ selectedPlaylist }}</h2>
    
    <!-- PlayerController ici pour contrôler la lecture -->
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

    <!-- Liste des musiques de la playlist active -->
    <MusicPlaylist
      :tracks="selectedPlaylistTracks"
      :currentTrackIndex="currentTrackIndex"
      @play-track="playTrack"
      @delete-track="deleteTrack"
    />
    <AddSongForm @add-track="addTrack" />
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import AddSongForm from "../components/AddSongForm.vue";
import PlayerController from "../components/PlayerController.vue";
import MusicPlaylist from "../components/MusicPlaylist.vue";

// Récupération de la playlist active depuis la route
const route = useRoute();
const selectedPlaylist = ref(route.query.playlist || "Default Playlist");

// Gestion des pistes
const allPlaylists = ref({}); // Toutes les playlists
const currentTrackIndex = ref(null);
const isPlaying = ref(false);
const playbackMode = ref("repeat-list");

// Chargement de la playlist active
const selectedPlaylistTracks = computed(() => {
  return allPlaylists.value[selectedPlaylist.value] || [];
});

// Charger toutes les playlists depuis localStorage
onMounted(() => {
  const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || {};
  allPlaylists.value = savedPlaylists;
});

const currentTrack = computed(() => {
  return currentTrackIndex.value !== null
    ? selectedPlaylistTracks.value[currentTrackIndex.value]
    : null;
});

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

const playTrack = (index) => {
  if (!selectedPlaylistTracks.value[index].broken) {
    currentTrackIndex.value = index;
    isPlaying.value = true;
  }
};

const skipTrack = (direction) => {
  if (playbackMode.value === "repeat-track" && direction === "next") {
    return; // Reste sur la même piste
  }

  if (direction === "next") {
    if (playbackMode.value === "repeat-list") {
      currentTrackIndex.value = (currentTrackIndex.value + 1) % selectedPlaylistTracks.value.length;
    } else if (currentTrackIndex.value + 1 < selectedPlaylistTracks.value.length) {
      currentTrackIndex.value += 1;
    } else {
      currentTrackIndex.value = null;
      isPlaying.value = false;
    }
  } else if (direction === "previous") {
    currentTrackIndex.value =
      (currentTrackIndex.value - 1 + selectedPlaylistTracks.value.length) % selectedPlaylistTracks.value.length;
  }
};

const deleteTrack = (index) => {
  selectedPlaylistTracks.value.splice(index, 1);
  if (currentTrackIndex.value === index) {
    currentTrackIndex.value = null;
    isPlaying.value = false;
  } else if (currentTrackIndex.value > index) {
    currentTrackIndex.value -= 1;
  }

  // Sauvegarder les modifications dans localStorage
  localStorage.setItem("playlists", JSON.stringify(allPlaylists.value));
};

const addTrack = (track) => {
  const newTrack = { ...track, broken: false };
  if (!allPlaylists.value[selectedPlaylist.value]) {
    allPlaylists.value[selectedPlaylist.value] = [];
  }
  allPlaylists.value[selectedPlaylist.value].push(newTrack);

  // Sauvegarder dans le localStorage
  localStorage.setItem("playlists", JSON.stringify(allPlaylists.value));
};
</script>
