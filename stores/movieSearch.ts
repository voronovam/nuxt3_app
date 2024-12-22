import {
  OmdbMovieType,
  OmdbResponseType
} from '@/types/movie';

export const useSearchStore = defineStore('search', () => {
  const data = ref<OmdbMovieType[]>([]);
  const responseStatus = ref<'True' | 'False' | ''>('');
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const searchTerm = ref('');
  const totalResults = ref<number>(0);
  const currentPage = ref(1);

  const fetchSearchData = async (search: string, page: number = 1): Promise<void> => {
    if (!search) {
      console.error('Search term is empty');
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<OmdbResponseType>(
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

  const getMoviesData = computed(() => {
    return data.value.map((movie) => ({
      id: movie.imdbID || '',
      title: movie.Title || '',
      poster: movie.Poster || '',
      year: movie.Year || '',
    }));
  });

  const isShowMoreBtn = computed(() => {
    return data.value.length < totalResults.value && !isLoading.value;
  });

  const loadMoreData = async (): Promise<void> => {
    if (!searchTerm.value) {
      console.error('Search term is empty, cannot load more data.');
      return;
    }

    currentPage.value++;
    await fetchSearchData(searchTerm.value, currentPage.value);
  };

  const setSearchTerm = (term: string): void => {
    searchTerm.value = term;
    currentPage.value = 1;
    fetchSearchData(term);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let recognition: typeof SpeechRecognition | null = null;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.start();

      recognition.onresult = (event: any) => {
        const searchQuery = event.results[0][0].transcript;
        console.log('Voice input received:', searchQuery);

        fetchSearchData(searchQuery);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      console.error('SpeechRecognition is not supported by your browser');
    }
  };

  return {
    data,
    responseStatus,
    totalResults,
    error,
    isLoading,
    searchTerm,
    currentPage,
    fetchSearchData,
    getMoviesData,
    isShowMoreBtn,
    loadMoreData,
    setSearchTerm,
    startVoiceSearch,
  };
});
