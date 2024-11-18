export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
}

export type Filter = 'popular' | 'now' | 'favorites';
