import { defineStore } from 'pinia';
import ArticlesApi from '../api/ArticlesApi';

export const useArticlesStore = defineStore({
  id: 'articles',
  state: () => ({}),

  actions: {
    async fetchArticles(params) {
      const api = new ArticlesApi();
      const { data } = await api.fetchArticles(params);

      return data;
    },

    async fetchArticle(id) {
      const api = new ArticlesApi(id);
      const { data } = await api.fetchArticle(id);

      return data;
    },
  },
});
