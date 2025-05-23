import React from 'react'
import Meta from '../components/meta';
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="home">
      {/* head elements */}
      <Meta />
      <Head>
        <title>Victor Mota</title>
      </Head>

      <div className="main">
        <h1>Victor Mota</h1>
        <nav>
          <div><Link href="/about">About Me</Link></div>
          <div><Link href="/writing">Writing</Link></div>
          <div><Link href="/books">Books</Link></div>
          <div><Link target="_blank" href="https://twitter.com/vimota">Twitter</Link></div>
          <div><Link href="mailto:vimota@gmail.com">Email</Link></div>
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
          margin: 20px 0;
          display: flex;
          flex-flow: row wrap;
          width: 300px;
          align-items: center;
          justify-content: center;
        }
        nav > * {
          display: inline-block;
          margin: 5px 15px;
          text-decoration: none;
        }
    `}</style>
    </div >
  )
}
