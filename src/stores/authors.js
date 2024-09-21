import { defineStore } from 'pinia';
import AuthorsApi from '../api/AuthorsApi';

export const useAuthorsStore = defineStore({
  id: 'authors',
  state: () => ({}),

  actions: {
    async fetchAuthors() {
      const api = new AuthorsApi();
      const { data } = await api.fetchAuthors();

      return data;
    },

    async fetchAuthor(id) {
      const api = new AuthorsApi(id);
      const { data } = await api.fetchAuthor(id);

      return data;
    },
  },
});
