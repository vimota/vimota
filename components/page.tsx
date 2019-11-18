import Meta from './meta';
import Link from 'next/link';


export default ({ children }) => (
    <div className="main">
      <div className="logo">
        <Link href="/"><a>vimota.me</a></Link>
        {' '}
        (<a href={`https://github.com/vimota/vimota`} target="_blank">src</a>)
      </div>
      <div className="flexcontainer">
        <nav>
          <Link href="/about"><a>About Me</a></Link>
          <Link href="/writing"><a>Writing</a></Link>
          <Link href="/books"><a>Books</a></Link>
          <a target="_blank" href="https://twitter.com/vimota">Twitter</a>
          <a href="mailto:vimota@gmail.com">Email</a>
        </nav>
    
        
        <div className="content">
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
        .flexcontainer {
          margin-top: 20px;
          display: flex;
          flex-direction: row;
        }
        .content {
          width: 100%;
        }
        nav {
          min-width: 95px;
          display: flex;
          flex-direction: column;
        }
        nav > * {
          padding: 3px 0px;
          margin: 2px 0px;
        }
        nav > :first-child {
          margin-top: 0;
        }
      `}</style>
    </div>
  );