<script setup>

import { usePlaylist } from "../composables/usePlaylist.js";
import Item from "./Item.vue";

const { items } = usePlaylist();

</script>

<template>
  <ol v-for="(title, index) in items" :key="index">
    <item :title :index />
  </ol>
</template>

<style scoped>

</style>