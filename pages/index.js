import React from 'react'
import Meta from '../components/meta';
import Link from 'next/link'
import Head from 'next/head'

const Home = () => (
  <div className="home">
    { /* global styles and meta tags */ }
    <Meta />
    <Head>
      <title>Victor Mota</title>
    </Head>

    <div className="main">
        <h1>Victor Mota</h1>
        <nav>
          <Link href="/about"><a>About Me</a></Link>
          <Link href="/writing"><a>Writing</a></Link>
          <a target="_blank" href="https://twitter.com/vimota">Twitter</a>
          <a href="mailto:vimota@gmail.com">Email</a>
        </nav>
    </div>

    <style jsx>{`
    .home {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: -1;
    }
    .main {
      flex: none;
      text-align: center;
    }
    h1 {
      font-size: 16px;
      font-weight: normal;
    }
    nav {
      margin-top: 20px;
    }
    a {
      display: inline-block;
      margin: 0 15px;
      text-decoration: none;
    }
  `}</style>
  </div>
)

export default Home
