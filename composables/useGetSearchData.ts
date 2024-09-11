export function useGetSearchData() {
  const data = ref([]);
  const responseStatus = ref('');
  const error = ref(null);
  const isLoading = ref(false);
  const searchTerm = ref('');
  const totalResults = ref(0);

  const fetchSearchData = async (search: string, page: number = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch(
        `${import.meta.env.VITE_OMDB_API_URL}/?s=${search}&page=${page}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
      );
      console.log(response.Search)

      if (response?.Error) {
        throw new Error(response.Error);
      }

      data.value = page === 1 ? response.Search || [] : [...data.value, ...(response.Search || [])];
      responseStatus.value = response.Response || '';
      totalResults.value = response.totalResults || 0;

    } catch (err) {
      console.error('Error fetch data:', err);
      error.value = err instanceof Error ? err.message : 'An unknown error';
    } finally {
      isLoading.value = false;
    }
  };

  watch(searchTerm, (newSearchTerm) => {
    if (newSearchTerm) {
      fetchSearchData(newSearchTerm);
    }
  });

  return {
    data,
    responseStatus,
    totalResults,
    error,
    isLoading,
    searchTerm,
    fetchSearchData,
  };
}
