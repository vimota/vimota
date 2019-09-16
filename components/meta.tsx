import Head from 'next/head';

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/atom" type="application/atom+xml" rel="alternate" title="Victor Mota" />
    </Head>

    { /* global styles */ }
    <style jsx global>{`
      * {
        margin: 0;
        box-sizing: border-box;
      }
      body {
        font: 14px Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
      }
      a {
        color: #ff7133;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }
      a:hover {
        color: #fff;
        background: #ff7133;
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