import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { GA_TRACKING_ID } from '../lib/gtag'

export default () => (
  <div>
    <Head>
      <title>Victor Mota</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/atom" type="application/atom+xml" rel="alternate" title="Victor Mota" />
      <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet"/>
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.png" />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
      <script dangerouslySetInnerHTML={
        { __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments)}
            gtag("js", new Date());
            gtag("config", '${GA_TRACKING_ID}');
        `}
      }></script>
    </Head>

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
      blockquote {
        margin: 5px 0;
        background: #f9f9f9;
        border-left: 10px solid #ccc;
        margin: 1.5em 10px;
        padding: 0.5em 10px;
      }
      blockquote:before {
        color: #ccc;
        font-size: 4em;
        line-height: 0.1em;
        margin-right: 0.25em;
        vertical-align: -0.4em;
      }
      blockquote p {
        margin-top: 10px;
      }
    `}</style>
  </div>
)