import axiosInstance from '../helpers/axios';

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

  request(method, url, config) {
    const requestUrl = this.getUrl(url);
    const requestConfig = { ...config, method, url: requestUrl };
    return axiosInstance(requestConfig);
  }
}
