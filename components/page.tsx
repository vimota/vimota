import Meta from './meta';
import Link from 'next/link';

const Page = ({ children }) => {
  return (
    <div className="main">
      <div className="logo">
        <Link href="/">vimota.me</Link>
      </div>
      <div className="flex flex-col mt-4">
        <nav className="md:fixed relative sidebar text-md flex flex-row md:flex-col justify-between mb-4">
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
