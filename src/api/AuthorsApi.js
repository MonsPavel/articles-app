import { BaseApi } from './BaseApi';

export default class AuthorsApi extends BaseApi {
  endpoint = '';

  fetchAuthors(params, config = {}) {
    const url = 'users';
    return this.request('GET', url, { params, ...config });
  }
}
