import React from 'react'

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

  span {
    color: #fff;
    font-size: 25px;
  }
  
`

const MovieSearch = () => {

  return (
    <SearchWrapper >
      <input type="text" name="search" placeholder="search for movies here..." /><span><MdSearch /></span>
    </SearchWrapper>
  )
}

export default MovieSearch