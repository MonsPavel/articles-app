<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthorsStore } from '../stores/authors';
import usePromise from '../composables/promise';
import { authorsHeaders } from '../constants/table';

const router = useRouter();
const authorsStore = useAuthorsStore();

const { fetchAuthors } = authorsStore;
const { loading, exec, data: authors } = usePromise(fetchAuthors);

const viewAuthor = (id) => {
  router.push({ name: 'author', params: { id } });
};

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
      :items-length="0"
    >
      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <v-btn
            class="ma-2"
            icon="mdi-eye"
            variant="text"
            @click="viewAuthor(item.id)"
          />
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>
