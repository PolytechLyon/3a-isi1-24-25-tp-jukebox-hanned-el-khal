<template>
  <div>
    <h2>Add new list</h2>
    <input
      placeholder="Add a new todo item"
      @keyup="addOnEnter"
      v-model="title"
      ref="input"
    />
    <button @click="addTodoItem">Add</button>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { usePlaylist } from "../composables/usePlaylist.js";

export default {
  name: "AddPlaylist",
  setup() {
    const { add, isEditing } = usePlaylist(); // Utilisation du composable
    const title = ref(""); // Variable réactive pour le champ d'entrée
    const input = ref(null); // Référence pour l'élément d'entrée

    // Fonction pour ajouter un élément
    const addTodoItem = () => {
      if (title.value.trim()) {
        add(title.value); // Ajoute la tâche via le composable
        title.value = ""; // Réinitialise le champ
      }
    };

    // Fonction pour gérer l'appui sur "Enter"
    const addOnEnter = (event) => {
      if (event.key === "Enter") {
        addTodoItem();
      }
    };



    return {
      title,
      input,
      addTodoItem,
      addOnEnter,
    };
  },
};
</script>