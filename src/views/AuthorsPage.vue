<script setup>
import { ref, onMounted } from 'vue';
import { useAuthorsStore } from '../stores/authors';

const authorsStore = useAuthorsStore();

const { fetchAuthors } = authorsStore;

const authors = ref([]);

onMounted(async () => {
  authors.value = await fetchAuthors();
});
</script>

<template>
  <div>
    {{ authors }}
  </div>
</template>
