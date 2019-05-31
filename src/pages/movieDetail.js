import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from 'styled-components'
import { Poster } from "../components/movie"

const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280'
const POSTER_PATH = 'https://image.tmdb.org/t/p/w154'

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`

const MovieDetail = ({ location }) => {
  const [movie, setMovie] = useState({})
  
  

  const fetchMovie = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${location.state.choice}?api_key=6d31c18d73745e3328f88183fb494647&language=en-US`)
      const movie = await res.json()
      setMovie(movie)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [])

  return (
    <Layout>
      <SEO title="Page two" />
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>

      <div style={{ display: `flex`,background: `#fff` }}>
        <Poster style={{ marginTop: `-5rem` }} src={`${POSTER_PATH}${movie.poster_path}`} alt={`${movie.title}`} />
        <p>{movie.release_date}</p>
        <p>{movie.overview}</p>
      </div>
      </MovieWrapper>
    </Layout>
  )
}

export default MovieDetail
