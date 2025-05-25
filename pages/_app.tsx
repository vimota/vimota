import { useRouter } from "next/router";
import { AppProps } from "next/app";
import * as gtag from "../lib/gtag";
import '../styles/index.css';
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import Script from "next/script";
import { GA_TRACKING_ID } from "../lib/gtag";
import { Analytics } from "@vercel/analytics/next"

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      ></Script>
      <Script
        id="gtag-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag("config", '${GA_TRACKING_ID}');
        `,
        }}
      ></Script>
      <DefaultSeo
        title="Victor Mota"
        canonical="https://vimota.me/"
        openGraph={{
          url: "https://vimota.me/",
          title: "Victor Mota",
          type: "website",
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
      <Analytics />
    </>
  );
}
