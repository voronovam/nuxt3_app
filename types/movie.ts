export type MovieType = {
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

export type MovieDetailsType = {
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

export type OmdbMovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export type OmdbResponseType = {
  Search: OmdbMovieType[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

export type MovieCardType = {
  id: string;
  title: string;
  poster: string;
  year: string;
}
