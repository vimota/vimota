import Meta from './meta';
import Link from 'next/link';

export default ({ children }) => {
  return (
    <div className="main">
      <div className="logo">
        <Link href="/"><a>vimota.me</a></Link>
      </div>
      <div className="flex flex-col mt-4">
        <nav className="md:fixed relative sidebar text-sm flex flex-row md:flex-col justify-between mb-4">
          <Link href="/about"><a>About Me</a></Link>
          <Link href="/writing"><a>Writing</a></Link>
          <Link href="/books"><a>Books</a></Link>
          <a target="_blank" href="https://twitter.com/vimota">Twitter</a>
          <a href="mailto:vimota@gmail.com">Email</a>
        </nav>
    
        
        <div className="content flex flex-col leading-loose m-auto max-w-screen-lg md:px-24 overflow-x-hidden w-full z-10">
          { children }
        </div>
      </div>
  
      { /* global styles and meta tags */ }
      <Meta />
  
      { /* local styles */ }
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
        a {
          text-decoration: none;
          display: inline-block;
          margin: 0 15px;
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
        nav > * {
          padding: 3px 0px;
          margin: 2px 0px;
        }
        {/* nav > :first-child {
          margin-top: 0;
        } */}
      `}</style>
    </div>
  )};
