import Router from "next/router";
import App from "next/app";
import * as gtag from "../lib/gtag";
import { DefaultSeo } from "next-seo";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <DefaultSeo
          title="Victor Mota"
          description="Disciplined reason in action."
          canonical="https://vimota.me/"
          openGraph={{
            url: "https://vimota.me/",
            title: "Victor Mota",
            type: "website",
            description: "Disciplined reason in action.",
            images: [
              {
                width: 200,
                height: 200,
                url: "https://vimota.me/static/favicon.png",
                alt: "Logo"
              }
            ],
            site_name: "Victor Mota"
          }}
          twitter={{
            handle: "@vimota",
            site: "@vimota",
            cardType: "summary"
          }}
        />
        <Component {...pageProps} />
      </>
    );
  }
}
