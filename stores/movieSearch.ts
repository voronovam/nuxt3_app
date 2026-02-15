import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { OmdbMovieType, OmdbResponseType } from '@/types/movie';

export const useSearchStore = defineStore('search', () => {
  const data = ref<OmdbMovieType[]>([]);
  const responseStatus = ref<'True' | 'False' | ''>('');
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const searchTerm = ref('');
  const searchQuery = ref('');
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
      const response = await fetch(
        `${import.meta.env.VITE_OMDB_API_URL}/?s=${search}&page=${page}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
      );
      const parsed = (await response.json()) as OmdbResponseType;

      if (parsed?.Error) {
        throw new Error(parsed.Error);
      }

      data.value = page === 1 ? parsed.Search || [] : [...data.value, ...(parsed.Search || [])];
      responseStatus.value = parsed.Response;
      totalResults.value = Number.parseInt(parsed.totalResults, 10) || 0;
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
    const SpeechRecognition =
      (window as Window & { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .SpeechRecognition ||
      (window as Window & { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.start();

      recognition.onresult = (event: any) => {
        searchQuery.value = event.results[0][0].transcript;
        searchTerm.value = searchQuery.value;
        fetchSearchData(searchQuery.value);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      console.error('SpeechRecognition is not supported by your browser');
    }
  };

  const resetSearch = (): void => {
    data.value = [];
    responseStatus.value = '';
    error.value = null;
    isLoading.value = false;
    searchTerm.value = '';
    searchQuery.value = '';
    totalResults.value = 0;
    currentPage.value = 1;
  };

  return {
    data,
    responseStatus,
    totalResults,
    error,
    isLoading,
    searchTerm,
    searchQuery,
    currentPage,
    fetchSearchData,
    getMoviesData,
    isShowMoreBtn,
    loadMoreData,
    setSearchTerm,
    startVoiceSearch,
    resetSearch,
  };
});
