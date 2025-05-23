import Meta from './meta';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Page = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <div className="main">
      <div className="logo flex flex-row justify-between">
        <Link href="/">vimota.me</Link>
        {!isHome && (
          <button
            className="md:hidden self-end mb-2 p-2 rounded focus:outline-none  focus:ring-green-700"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block w-4 h-0.5 bg-green-700 mb-0.5"></span>
            <span className="block w-4 h-0.5 bg-green-700 mb-0.5"></span>
            <span className="block w-4 h-0.5 bg-green-700"></span>
          </button>
        )}
      </div>
      <div className="flex flex-col mt-2">
        {/* Hamburger for mobile, only if not home */}


        {/* Nav: always visible on md+, collapsible on mobile */}
        <nav
          className={`
            sidebar text-md justify-between mb-4 flex-col space-y-2 text-center
            md:fixed md:flex-col md:flex md:space-y-0 md:space-x-0 md:text-left
            ${!isHome ? (menuOpen ? 'flex' : 'hidden') : 'flex'}
          `}
        >
          <Link className="py-1 my-0.5" href="/about">About Me</Link>
          <Link className="py-1 my-0.5" href="/writing">Writing</Link>
          <Link className="py-1 my-0.5" href="/books">Books</Link>
          <Link target="_blank" className="py-1 my-0.5" href="https://twitter.com/vimota">Twitter</Link>
          <Link className="py-1 my-0.5" href="mailto:vimota@gmail.com">Email</Link>
          <Link className="py-1 my-0.5" href="https://cal.com/vimota/15min">Chat with me 👋</Link>
        </nav>

        <div className="content flex flex-col leading-loose m-auto max-w-screen-sm overflow-x-hidden w-full z-10">
          {children}
        </div>
      </div>

      {/* head elements */}
      <Meta />

      {/* page styling */}
      <style jsx>{`
        .main {
          padding: 25px 50px;
        }
        .logo {
          padding-bottom: 30px;
        }
        .logo a {
          margin: 0 0 15px 0;
        }
        navLink {
          text-decoration: none;
          display: inline-block;
          padding: 3px 0px;
          margin: 2px 0px;
        }
        @media (max-width: 500px) {
          .main {
            padding: 25px 15px;
          }
          .logo {
            padding-bottom: 20px;
          }
        }
        nav {
          min-width: 95px;
        }
        {/* nav > :first-child {
          margin-top: 0;
        } */}
      `}</style>
    </div>
  )
};

export default Page;
