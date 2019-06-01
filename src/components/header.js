import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components'
// import MovieSearch from './movieSearch'

const HeaderWrapper = styled.header`
  background: #111;
  /* min-height: 12vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* font-size:  4vmin; */
  color: #fff;

`


const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0, fontWeight: 200 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    {/* <div>
      <MovieSearch />
    </div> */}
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
