import { BaseApi } from './BaseApi';

export default class ArticlesApi extends BaseApi {
  endpoint = '';

  fetchArticles(params, config = {}) {
    const url = 'posts';
    return this.request('GET', url, { params, ...config });
  }
}
