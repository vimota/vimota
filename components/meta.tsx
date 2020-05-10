import Head from 'next/head';
import { GA_TRACKING_ID } from '../lib/gtag'

export default () => (
  <div>
    <Head>
      <title>Victor Mota</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/atom" type="application/atom+xml" rel="alternate" title="Victor Mota" />
      <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
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
  </div>
)