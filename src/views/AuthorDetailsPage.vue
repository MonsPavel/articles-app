<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useArticlesStore } from '../stores/articles';
import { useAuthorsStore } from '../stores/authors';
import { articlesTable } from '../constants/table';
import { authorsDetails } from '../constants/details';
import usePromise from '../composables/promise';

const route = useRoute();
const articlesStore = useArticlesStore();
const authorStore = useAuthorsStore();

const { fetchArticles } = articlesStore;
const { fetchAuthor } = authorStore;

const author = ref({});
const articles = ref([]);

const authorId = computed(() => +route.params.id);
const authorName = computed(() => author.value?.name || '');

const initPage = async () => {
  author.value = await fetchAuthor(authorId.value);
  articles.value = await fetchArticles({ author_id: authorId.value });
};

const viewArticle = () => {

};

const { loading, exec } = usePromise(initPage);

onMounted(() => {
  exec();
});
</script>

<template>
  <div>
    <h1>
      {{ authorName }}
    </h1>

    <div v-for="{ title, key } in authorsDetails" :key="key" class="d-flex">
      <div class="author-description-title">{{ title }}</div>
      <div class="author-description-value">{{ author[key] }}</div>
    </div>

    <v-data-table-server
      :items="articles || []"
      :loading="loading"
      :headers="articlesTable"
      :hide-default-footer="true"
      :items-length="authorsCount"
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

<style scoped>
.author-description-title {
  width: 100px;
}

.text-loader {
  width: 250px;
  background: #f5f5f5;
}
</style>
