import Head from 'next/head';
import { NextSeo } from 'next-seo';

export default () => (
  <div>
    <Head>
      <title>Victor Mota</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/atom" type="application/atom+xml" rel="alternate" title="Victor Mota" />
      <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet"/>
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.png" />
    </Head>
    <NextSeo
      title="Victor Mota"
      description="Disciplined reason in action."
      canonical="https://vimota.me/"
      openGraph={{
        url: 'https://vimota.me/',
        title: 'Victor Mota',
        description: 'Disciplined reason in action.',
        images: [
          { url: '/static/favicon.png' },
        ],
        site_name: 'Victor Mota',
      }}
      twitter={{
        handle: '@vimota',
        site: '@vimota',
        cardType: 'summary',
      }}
    />

    { /* global styles */ }
    <style jsx global>{`
      * {
        margin: 0;
        box-sizing: border-box;
      }
      body {
        font: 16px 'Lato', sans-serif;
      }
      a {
        color: #689f38;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }
      a:hover {
        color: #fff;
        background: #387002;
        text-decoration: none;
      }
      p {
        line-height: 25px;
      }
      li {
        margin: 5px 0;
      }
    `}</style>
  </div>
)