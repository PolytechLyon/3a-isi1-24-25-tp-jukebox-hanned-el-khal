<script setup>
import { useTodoList } from "../composables/useTodoList.js";
import { useRouter } from "vue-router"; // Import du router

const props = defineProps({
  title: String,
  index: Number,
});

const {
  remove,
} = useTodoList();

const router = useRouter(); // Initialisation du router

function removeItem() {
  remove(props.index);
}

function selectItem() {
  // Redirige vers l'accueil avec la playlist sélectionnée comme paramètre
  router.push({
    path: "/",
    query: { playlist: props.title },
  });
}
</script>

<template>
  <li>
    <span>{{ props.title }}</span>
    <button @click="removeItem">delete</button>
    <button @click="selectItem">select</button>
  </li>
</template>

<style scoped>
span {
  display: inline-block;
  width: 15em;
}

button {
  width: 4em;
  margin: 2px;
}
</style>
