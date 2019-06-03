import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from 'styled-components'
import Movie from '../components/movie';
import { MdSkipPrevious, MdSkipNext, MdPlayArrow } from 'react-icons/md'
import { MdSearch } from 'react-icons/md'


const MovieGrid = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  padding: 4rem;
  /* max-width: 1240px;
  margin: 0 auto; */
  display: grid;
  grid-gap:  0 20px;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  text-align: center;
  
  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 4rem 1.2rem;
    grid-gap: 0;
    margin: 0;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 4rem 0;
    grid-gap: 20px 0;
    margin: 0;
  }
  `

const PageControls = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: #fff;
  justify-items: center;
  justify-content: center;
  text-align: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: 960px;
  margin: 0 auto;
  padding-bottom: 200px;


   div {
     font-size: 25px;
     font-weight: 300;
     letter-spacing: 2px;
   }
  
  button {
    font-size: 50px;
    color: #fff;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    width: 30px;
  }
  #prev {
    transform: scaleX(-1);
  }
  @media (max-width: 800px) {
    button {
      font-size: 30px
    }
    div {
      font-size: 20px
    }
  }
  @media (max-width: 600px) {
    button {
      font-size: 25px
    }
    div {
      font-size: 16px;
    }
  }
`

const SearchWrapper =styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  padding: 20px;
  align-items: center;
  justify-content: center;
  text-align: right;

  input {
    padding: 3px 10px;
    margin: 0;
    border: none;
    border-bottom: 2px solid gray;
    width: 280px;
    background: #222;
    color: #fff;
    outline: none;
  }

  button {
    background: transparent;
    border: none;
    outline: none;

  }

  span {
    color: #fff;
    font-size: 25px;
  }
`

const IndexPage = () => {
  // state management with Hooks
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [ searched, setSearched] = useState('')
  
  const nextHandler = () => {
    setPage(page + 1)
    // cleanup function ensures predicatble behavior for pagination.
    return () => {
      fetchData()
    }
  }
  
  const prevHandler = () => {
    if (page === 1) {
      return 
    } else {
      setPage(page - 1)
    } 
    // cleanup function ensures predicatble behavior for pagination.
    return () => {
      fetchData()
    }
  }

  const resetHandler = () => {
    setPage(1) 

    return () => {
      fetchData()
    }
  }

  const lastHandler = () => {
    setPage(page + 20)

    return () => {
      fetchData()
    }
  }
  
  // API call extracted to named function making it available to be 'set' by Hooks.
  const fetchData = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6d31c18d73745e3328f88183fb494647&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
      const movies = await res.json()
      setMovies(movies.results)
    } catch(e) {
      console.log(e)
    }
  }

  
  useEffect(() => {
    fetchData()
    // clean up within useEffect was not effective ???
  }, [page])
  
  const fetchSearchData = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/company?api_key=6d31c18d73745e3328f88183fb494647&query=${searched}&page=1`)
      const searchResults = await res.json()
      setSearched(searchResults.result)
    } catch(e) {
      console.log(e)
    }
  }

  

  const searchHandler = (e) => {
    console.log(searched)
    fetchSearchData()
  }

  // useEffect(() => {
  //   if ( searchData === '' ) {
  //     return 
  //   } else {
  //     fetchSearchData()
  //   }
  // }, [searchData])
  

  return (
    <Layout>
      <SEO title="Home" />

        <SearchWrapper>
          <label htmlFor="search"></label>
          <input type="text" name="search" placeholder="Search for movies here..." input={searched} onInput={e => setSearch(e.target.value)} />

          <button onClick={() => searchHandler()} ><span><MdSearch /></span></button>
        </SearchWrapper>

        {searchResults.map( movie => (
          <img src={movie.id} alt={movie.title} />
        ))}
        
        <MovieGrid>
          {movies.map(movie => (
            <Movie key={movie.id} src={movie.id} alt={movie.title} movie={movie} />
          ))}
        </MovieGrid>

        <PageControls>
          <button onClick={() => resetHandler()}> <span><MdSkipPrevious /></span></button>
          <button id="prev" onClick={() => prevHandler()} ><span><MdPlayArrow /></span></button>
          <div>Page {page}</div>
          <button onClick={() => nextHandler()} ><span><MdPlayArrow /></span></button>
          <button onClick={() => lastHandler()} ><span><MdSkipNext /></span></button>
        </PageControls>

    </Layout>
  )
}

export default IndexPage
