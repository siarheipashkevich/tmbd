import request from '@/utils/request';
import { Filter, Movie } from '@/types';

export class MovieService {
  public static async fetchMovie(movieId: Movie['id']): Promise<Movie> {
    return request({
      path: `/movie/${movieId}`,
    });
  }

  public static async fetchMovies(filter: Filter): Promise<Movie[]> {
    if (filter === 'popular') {
      return MovieService.fetchPopularMovies();
    }

    return MovieService.fetchNowPlayingMovies();
  }

  private static async fetchPopularMovies(): Promise<Movie[]> {
    const response = await request<{ results: Movie[] }>({ path: '/movie/popular' });

    return response.results;
  }

  private static async fetchNowPlayingMovies(): Promise<Movie[]> {
    const response = await request<{ results: Movie[] }>({ path: '/movie/now_playing' });

    return response.results;
  }
}
