import { setupCache } from 'axios-cache-interceptor';

import axiosInstance from '../helpers/axios';

const axios = setupCache(axiosInstance);

// eslint-disable-next-line import/prefer-default-export
export class BaseApi {
  endpointPrefix = '';

  endpoint = '';

  getUrl(path) {
    let fullUrl = [this.endpointPrefix, this.endpoint, path]
      .filter(Boolean)
      .join('/');

    fullUrl = fullUrl.replace('//', '/');

    return fullUrl;
  }

  request(method, url, config, cache = false) {
    const requestUrl = this.getUrl(url);
    const requestConfig = {
      ...config, method, url: requestUrl, cache,
    };

    return axios(requestConfig);
  }
}
