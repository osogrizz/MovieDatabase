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
  background-size: 100%;
  background-color: #fff;

  img {
    margin: -5rem 60px 220px 60px;
    height: fit-content;
  }

  @media (max-width: 800px) {
    background-size: 100%;

    img {
      height: fit-content;
    }
  }
  @media (max-width: 600px) {
    position: absolute;
    background-size: 100%;
    display: grid;
    grid-template-rows: 200px;
    padding-top: 47vh;

    img {
      /* height: 120px;
      margin: 20px auto; */
      display: none;
    }
  }
`

const Container = styled.div`
  display: flex;
  background: #fff;

  @media (max-width: 600px) {
    display: grid;
    margin: 10px auto;
    height: 80vh;
    text-align: center;
    justify-content: center;
    grid-template-rows: 1fr;
    margin: -21vh auto;
  }
`

const Blob = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  display: grid;
  text-align: left;
  grid-template-rows: 80px;

  p {
    padding: 20px;
  }

  #title {
    margin: 0;
    font-size: 30px;
  }

  #desc {
    max-width: 960px;
    font-size: 1.2rem;
    letter-spacing: 1px;
    line-height: 32px;
  }

  @media (max-width: 800px) {
    
  }
  @media (max-width: 600px) {
    text-align: center;
    grid-template-rows: 120px 50px 120px;
    
    #title {
      line-height: 30px;
    }
  }

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

      <Container>
        <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={`${movie.title}`} />
        <Blob>
          { }
          <p id="title">{movie.title}</p>
          <p>Release Date: {movie.release_date}</p>
          <p id="desc" >{movie.overview}</p>
        </Blob> 
      </Container>
      </MovieWrapper>
    </Layout>
  )
}

export default MovieDetail
