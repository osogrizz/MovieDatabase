import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'


const SearchWrapper =styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  margin: 20px;
    align-items: center;
    justify-content: center;

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

const MovieSearch = () => {

  const [ searchData, setSearchData] = useState([])

  const fetchSearch = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6d31c18d73745e3328f88183fb494647&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2`)
      const searchData = await res.json()
      setSearchData(searchData.results)
    } catch(e) {
      console.log(e)
    }
  }

  const searchHandler = () => {
    console.log('searched!')
    setSearchData(searchData)

    return () => {
      fetchSearch()
    }
  }

  useEffect(() => {
    fetchSearch()
  }, [searchData])

  return (
    <SearchWrapper >
      <input type="search" name="search" placeholder="search for movies here..."  />
      <button onClick={() => searchHandler() }><span><MdSearch /></span></button>
    </SearchWrapper>
  )
}

export default MovieSearch