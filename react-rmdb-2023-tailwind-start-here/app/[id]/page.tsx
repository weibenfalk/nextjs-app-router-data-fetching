import { movieUrl, creditsUrl, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../config';
// Basic fetch
import { basicFetch } from '../../api/fetchFunctions';
// Components
import Header from '../../components/Header/Header';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import Grid from '../../components/Grid/Grid';
import Card from '../../components/Card/Card';
// Types
import type { Movie, Credits } from '../../api/types';

const getMovieData = async (id: string) => {
  const movieEndpoint: string = movieUrl(id);
  const creditsEndpoint: string = creditsUrl(id);

  const movie = await basicFetch<Movie>(movieEndpoint);
  const credits = await basicFetch<Credits>(creditsEndpoint);

  // Get the directors only
  const directors = credits.crew.filter(member => member.job === 'Director');

  return {
    movie,
    directors,
    cast: credits.cast
  };
};

const Movie = async ({ params }: { params: { id: string } }) => {
  const { movie, directors, cast} = await getMovieData(params.id);

  return (
    <main>
      <Header />
      <Breadcrumb title={movie.original_title} />
      <MovieInfo
        thumbUrl={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : '/no_image.jpg'}
        rating={movie.vote_average.toFixed(1)}
        year={movie.release_date.split('-')[0]}
        backgroundImgUrl={movie.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path : '/no_image.jpg'}
        title={movie.original_title}
        summary={movie.overview}
        directors={directors}
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid className='p-4 max-w-7xl m-auto' title='Actors'>
        {cast.map(actor => (
          <Card
            key={actor.credit_id}
            imgUrl={actor.profile_path ? IMAGE_BASE_URL + POSTER_SIZE + actor.profile_path : '/no_image.jpg'}
            title={actor.name}
            subtitle={actor.character}
          />
        ))}
      </Grid>
    </main>
  );
};

export default Movie;
