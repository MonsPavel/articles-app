<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useArticlesStore } from '../stores/articles';
import { useAuthorsStore } from '../stores/authors';
import { allArticlesTable } from '../constants/table';
import usePromise from '../composables/promise';

const router = useRouter();
const articlesStore = useArticlesStore();
const authorStore = useAuthorsStore();

const { fetchArticles } = articlesStore;
const { fetchAuthors } = authorStore;

const { getViewedArticles } = storeToRefs(articlesStore);

const authors = ref([]);
const articles = ref([]);

const mappedAuthors = computed(() => (authors.value?.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})));

const tableData = computed(() => articles.value.map((item) => ({
  ...item, ...mappedAuthors.value[item.userId], id: item.id, viewed: getViewedArticles.value[item.id],
})));

const initPage = async () => {
  articles.value = await fetchArticles();
  authors.value = await fetchAuthors();
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
