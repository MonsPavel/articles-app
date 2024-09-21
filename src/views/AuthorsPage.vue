<script setup>
import { computed, onMounted } from 'vue';
import { useAuthorsStore } from '../stores/authors';
import usePromise from '../composables/promise';
import { authorsHeaders } from '../constants/table';

const authorsStore = useAuthorsStore();

const { fetchAuthors } = authorsStore;
const { loading, exec, data: authors } = usePromise(fetchAuthors);

const authorsCount = computed(() => authors.value?.length || 0);

onMounted(() => {
  exec();
});
</script>

<template>
  <div>
    <v-data-table-server
      :items="authors || []"
      :loading="loading"
      :headers="authorsHeaders"
      :hide-default-footer="true"
      :items-length="authorsCount"
    />
  </div>
</template>
