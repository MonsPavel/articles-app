import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default (routeName, filtersKeys = []) => {
  const router = useRouter();
  const route = useRoute();

  const filter = ref({});

  const setFilters = () => {
    const { query } = route;
    filtersKeys.forEach((key) => {
      filter.value[key] = query[key];
    });
  };

  const setFilter = (queryKey, val) => {
    const { query } = route;

    const newQuery = {
      ...query,
    };

    filter.value[queryKey] = val;

    if (val) {
      newQuery[queryKey] = val;
    } else {
      delete newQuery[queryKey];
    }

    router.push({ name: routeName, query: { ...newQuery } });
  };

  return {
    setFilters, setFilter, filter,
  };
};
