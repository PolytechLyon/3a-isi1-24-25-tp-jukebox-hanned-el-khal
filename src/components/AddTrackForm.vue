<template>
  <div>
    <h1>New Track</h1>
    <div>
      <label>
        <input type="radio" v-model="addMode" value="url" /> By URL
      </label>
      <label>
        <input type="radio" v-model="addMode" value="file" /> By File
      </label>
    </div>
    <div v-if="addMode === 'url'">
      <input v-model="newTrackUrl" placeholder="Provide URL" />
      <button @click="addTrack">Add by URL</button>
    </div>
    <div v-else>
      <input type="file" @change="addTrackByFile" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-track']);

const addMode = ref('url');
const newTrackUrl = ref('');

const addTrack = () => {
  if (newTrackUrl.value.trim()) {
    emit('add-track', { title: newTrackUrl.value.split('/').pop(), url: newTrackUrl.value });
    newTrackUrl.value = '';
  } else {
    alert('Please provide a valid URL');
  }
};

const addTrackByFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    emit('add-track', { title: file.name, url: URL.createObjectURL(file) });
  }
};
</script>