import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';


const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
// const POSTER_PATH = 'https://image.tmdb.org/t/p/w342'

export const Poster = styled.img`
  box-shadow: 0 0 35px black;

@media (max-width: 600px) {
  margin: 0;
  padding: 0;
}
`
const Movie = ({ movie }) => {
  return (
    <div>
      <Link to={`/movieDetail/`} state={{ choice: movie.id }}>
        <Poster src={`${POSTER_PATH}${movie.poster_path}`} value={movie.id} />
      </Link>
    </div>
  )
};

export default Movie;
