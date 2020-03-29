import Head from 'next/head';
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
      article img {
        max-width: 600px;
      }
      article h1 {
        padding-top: 10px;
        padding-bottom: 10px;
      }
      article h2 {
        padding-top: 10px;
        padding-bottom: 10px;
      }
      article h3 {
        padding-top: 10px;
        padding-bottom: 10px;
      }
      article h4 {
        padding-top: 8px;
        padding-bottom: 8px;
      }
      p {
        line-height: 25px;
        padding-bottom: 10px;
      }
      li {
        margin: 5px 0;
        line-height: 23px;
      }
      ul {
        margin-top: 12px;
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