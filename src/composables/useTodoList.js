import { computed, readonly, ref } from "vue";

const list = ref([]);
const items = readonly(list);
const editedItemIndex = ref();

function add(title) {
    list.value.push(title);
}

export function useTodoList() {
    return {
        add

    }
}