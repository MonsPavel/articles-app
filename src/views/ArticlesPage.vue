<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useArticlesStore } from '../stores/articles';
import { useAuthorsStore } from '../stores/authors';
import { allArticlesTable } from '../constants/table';
import { viewFilters } from '../constants/filters';

import usePromise from '../composables/promise';
import useFilters from '../composables/filters';

const router = useRouter();
const articlesStore = useArticlesStore();
const authorStore = useAuthorsStore();

const { fetchArticles } = articlesStore;
const { fetchAuthors } = authorStore;

const { getViewedArticles } = storeToRefs(articlesStore);

const { setFilter, setFilters, filter } = useFilters('articles', ['author_id', 'viewed']);

const authors = ref([]);
const articles = ref([]);

const mappedAuthors = computed(() => (authors.value?.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})));

const tableData = computed(() => {
  let mappedArticles = articles.value.map((item) => ({
    ...item,
    ...mappedAuthors.value[item.userId],
    id: item.id,
    viewed: getViewedArticles.value[item.id] || false,
  }));

  if (filter.value.viewed) {
    mappedArticles = mappedArticles.filter((item) => String(item.viewed) === String(filter.value.viewed));
  }

  const id = filter.value?.author_id;

  if (!id) {
    return mappedArticles;
  }

  mappedArticles = mappedArticles.filter((item) => item.userId === +id);

  return mappedArticles;
});

const initPage = async () => {
  authors.value = await fetchAuthors();
  authors.value.unshift({ name: 'Все', id: '' });
  setFilters();
  articles.value = await fetchArticles();
};

const { loading, exec } = usePromise(initPage);

const viewArticle = (id) => {
  router.push({ name: 'article', params: { id } });
};

onMounted(() => {
  exec();
});
</script>

<template>
  <div>
    <div class="d-flex articles filters">
      <v-autocomplete
        :model-value="mappedAuthors[filter.author_id]"
        :items="authors"
        item-title="name"
        item-value="id"
        @update:model-value="(val) => setFilter('author_id', val)"
      />

      <v-select
        :model-value="filter.viewed"
        :items="viewFilters"
        item-title="title"
        item-value="key"
        @update:model-value="(val) => setFilter('viewed', val)"
      />
    </div>

    <v-data-table-server
      :items="tableData"
      :loading="loading"
      :headers="allArticlesTable"
      :hide-default-footer="true"
      :items-length="0"
    >
      <template v-slot:item.viewed="{ item }">
        <div class="d-flex">
          <v-icon v-if="item.viewed" color="teal-darken-3" icon="mdi-check" />
          <v-icon v-else color="red-darken-3" icon="mdi-close" />
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <v-btn
            class="ma-2"
            icon="mdi-eye"
            variant="text"
            @click="viewArticle(item.id)"
          />
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
</style>
