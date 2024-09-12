export interface OmdbMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface OmdbResponse {
  Search: OmdbMovie[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

export function useGetSearchData() {
  const data = ref<OmdbMovie[]>([]);
  const responseStatus = ref<'True' | 'False' | ''>('');
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const searchTerm = ref('');
  const totalResults = ref<number>(0);

  const fetchSearchData = async (search: string, page: number = 1): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<OmdbResponse>(
        `${import.meta.env.VITE_OMDB_API_URL}/?s=${search}&page=${page}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
      );

      if (response?.Error) {
        throw new Error(response.Error);
      }

      data.value = page === 1 ? response.Search || [] : [...data.value, ...(response.Search || [])];
      responseStatus.value = response.Response;
      totalResults.value = parseInt(response.totalResults, 10) || 0;

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
