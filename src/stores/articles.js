import { defineStore } from 'pinia';
import ArticlesApi from '../api/ArticlesApi';

// eslint-disable-next-line import/prefer-default-export
export const useArticlesStore = defineStore({
  id: 'articles',
  state: () => ({
    viewed: {},
  }),

  getters: {
    getViewedArticles() {
      if (Object.keys(this.viewed).length !== 0) {
        return this.viewed;
      }

      this.viewed = JSON.parse(localStorage.getItem('viewed')) || {};
      return this.viewed;
    },
  },

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

    setViewed(id) {
      this.viewed[id] = true;
      localStorage.setItem('viewed', JSON.stringify(this.viewed));
    },
  },
});
