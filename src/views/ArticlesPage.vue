<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useArticlesStore } from '../stores/articles';
import { useAuthorsStore } from '../stores/authors';
import { allArticlesTable } from '../constants/table';
import usePromise from '../composables/promise';
import { viewFilters } from '../constants/filters';

const router = useRouter();
const route = useRoute();
const articlesStore = useArticlesStore();
const authorStore = useAuthorsStore();

const { fetchArticles } = articlesStore;
const { fetchAuthors } = authorStore;

const { getViewedArticles } = storeToRefs(articlesStore);

const authors = ref([]);
const articles = ref([]);
const author = ref(null);
const viewFilter = ref('');

const mappedAuthors = computed(() => (authors.value?.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})));

const tableData = computed(() => {
  let mappedArticles = articles.value.map((item) => ({
    ...item,
    ...mappedAuthors.value[item.userId],
    id: item.id,
    viewed: getViewedArticles.value[item.id] || false,
  }));

  if (viewFilter.value) {
    mappedArticles = mappedArticles.filter((item) => String(item.viewed) === String(viewFilter.value));
  }

  const id = author.value?.id || author.value;

  if (!id) {
    return mappedArticles;
  }

  mappedArticles = mappedArticles.filter((item) => item.userId === id);

  return mappedArticles;
});

const setFilters = () => {
  const { query } = route;
  const authorId = query.author_id;
  viewFilter.value = query.viewed;
  author.value = mappedAuthors.value[authorId];
};

const setAuthor = () => {
  const { query } = route;

  const newQuery = {
    ...query,
  };

  if (author.value) {
    newQuery.author_id = author.value;
  } else {
    delete newQuery.author_id;
  }

  router.push({ name: 'articles', query: { ...newQuery } });
};

const setViewFilter = () => {
  const { query } = route;

  const newQuery = {
    ...query,
  };

  if (String(viewFilter.value)) {
    newQuery.viewed = viewFilter.value;
  } else {
    delete newQuery.viewed;
  }

  router.push({ name: 'articles', query: { ...newQuery } });
};

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
        v-model="author"
        :items="authors"
        item-title="name"
        item-value="id"
        @update:model-value="setAuthor"
      />

      <v-select
        v-model="viewFilter"
        :items="viewFilters"
        item-title="title"
        item-value="key"
        @update:model-value="setViewFilter"
      />
    </div>

    <v-data-table-server
      :items="tableData"
      :loading="loading"
      :headers="allArticlesTable"
      :hide-default-footer="true"
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
