export type movieType = {
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

export type movieDetailsType = {
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

export type OmdbMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export type OmdbResponse = {
  Search: OmdbMovie[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

export type movieCard = {
  id: string;
  title: string;
  poster: string;
  year: string;
}
