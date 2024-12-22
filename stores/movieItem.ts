import { MovieDetailsType, MovieType } from '@/types/movie';

export const useMovieItem = defineStore('movieList', () => {
  const data = ref<MovieType | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const getMovie = async (id: string): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    const url = `${import.meta.env.VITE_OMDB_API_URL}/?i=${id}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

    try {
      const response = await fetch(url);
      const filmDetails = (await response.json()) as MovieDetailsType;

      if (filmDetails && filmDetails.imdbID) {
        data.value = {
          id: filmDetails.imdbID,
          title: filmDetails.Title,
          poster: filmDetails.Poster,
          year: filmDetails.Year,
          released: filmDetails.Released,
          runtime: filmDetails.Runtime,
          genre: filmDetails.Genre,
          director: filmDetails.Director,
          writer: filmDetails.Writer,
          actors: filmDetails.Actors,
          country: filmDetails.Country,
          plot: filmDetails.Plot,
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching film data:', err);
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  const title = computed(() => data.value?.title || '');
  const poster = computed(() => data.value?.poster || '');
  const year = computed(() => data.value?.year || '');
  const released = computed(() => data.value?.released || '');
  const runtime = computed(() => data.value?.runtime || '');
  const genre = computed(() => data.value?.genre || '');
  const director = computed(() => data.value?.director || '');
  const writer = computed(() => data.value?.writer || '');
  const actors = computed(() => data.value?.actors || '');
  const country = computed(() => data.value?.country || '');
  const plot = computed(() => data.value?.plot || '');

  return {
    data,
    error,
    isLoading,
    getMovie,
    title,
    poster,
    year,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    country,
    plot,
  };
});
