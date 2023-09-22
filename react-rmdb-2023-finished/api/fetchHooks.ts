import { useInfiniteQuery } from '@tanstack/react-query';
// Fetch function
import { basicFetch } from './fetchFunctions';
// Types
import { Movies } from './types';

export const useFetchMovies = (search: string) => {
  return useInfiniteQuery<Movies>(
    ['movies', search],
    ({ pageParam = 1 }) => basicFetch(`/movies?search=${search}&page=${pageParam}`),
    {
      getNextPageParam: (lastPage: Movies) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }

        return undefined;
      },
      refetchOnWindowFocus: false
    }
  );
};
