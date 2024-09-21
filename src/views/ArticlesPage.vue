<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useArticlesStore } from '../stores/articles';
import { useAuthorsStore } from '../stores/authors';
import { allArticlesTable } from '../constants/table';
import usePromise from '../composables/promise';

const router = useRouter();
const articlesStore = useArticlesStore();
const authorStore = useAuthorsStore();

const { fetchArticles } = articlesStore;
const { fetchAuthors } = authorStore;

const authors = ref([]);
const articles = ref([]);

const tableData = computed(() => articles.value.map((item) => ({ ...item, ...authors.value[item.userId] })));

const initPage = async () => {
  const data = await fetchAuthors();
  articles.value = await fetchArticles();
  authors.value = data.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
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
