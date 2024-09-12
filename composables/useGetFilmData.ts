export interface FilmModel {
  id: string;
  title: string;
  poster: string;
  year: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  country: string;
  plot: string;
}

export interface OmdbFilmDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Country: string;
  Plot: string;
}

export function useGetFilmData() {
  const filmData = ref<FilmModel | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const fetchFilmData = async (id: string): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    const url = `${import.meta.env.VITE_OMDB_API_URL}/?i=${id}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

    try {
      const { data } = await useFetch(url, { key: id });

      const filmDetails = data.value as OmdbFilmDetails;

      if (filmDetails && filmDetails.imdbID) {
        filmData.value = {
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

  return {
    filmData,
    error,
    isLoading,
    fetchFilmData,
  };
}
