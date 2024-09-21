import { ref } from 'vue';

export default (promise) => {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const exec = (...args) => {
    loading.value = true;
    error.value = null;
    data.value = null;

    return promise(...args).then((response) => {
      data.value = response;
    }).catch((e) => {
      error.value = e;
    }).finally(() => {
      loading.value = false;
    });
  };

  return {
    data, loading, error, exec,
  };
};
