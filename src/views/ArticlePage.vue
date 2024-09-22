<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticlesStore } from '../stores/articles';
import usePromise from '../composables/promise';

const route = useRoute();
const articlesStore = useArticlesStore();

const { fetchArticle, setViewed } = articlesStore;
const {
  loading, exec, data: article, error,
} = usePromise(fetchArticle);

const articleId = computed(() => +route.params.id);
const articleTitle = computed(() => article.value?.title || '');
const articleContent = computed(() => article.value?.body || '');

onMounted(() => {
  exec(articleId.value);
  setViewed(articleId.value);
});
</script>

<template>
  <v-skeleton-loader type="article" :loading="loading">
    <v-col v-if="!error">
      <v-btn class="mb-3" @click="$router.go(-1)">
        Назад
      </v-btn>

      <div>
        <h1>
          {{ articleTitle }}
        </h1>

        <div>
          {{ articleContent }}
        </div>
      </div>
    </v-col>

    <div>
      <v-btn class="mb-3" @click="$router.go(-1)">
        Назад
      </v-btn>

      <div>
        Статья не найдена
      </div>
    </div>
  </v-skeleton-loader>
</template>
