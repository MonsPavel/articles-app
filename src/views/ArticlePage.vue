<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticlesStore } from '../stores/articles';
import usePromise from '../composables/promise';

const route = useRoute();
const articlesStore = useArticlesStore();

const { fetchArticle } = articlesStore;
const { loading, exec, data: article } = usePromise(fetchArticle);

const articleId = computed(() => +route.params.id);
const articleTitle = computed(() => article.value?.title || '');
const articleContent = computed(() => article.value?.body || '');

onMounted(() => {
  exec(articleId.value);
});
</script>

<template>
  <v-skeleton-loader type="article" :loading="loading">
    <h1>
      {{ articleTitle }}
    </h1>

    <div>
      {{ articleContent }}
    </div>
  </v-skeleton-loader>
</template>
