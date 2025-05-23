import { useRouter } from "next/router";
import { AppProps } from "next/app";
import * as gtag from "../lib/gtag";
import '../styles/index.css';
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import Script from "next/script";
import { GA_TRACKING_ID } from "../lib/gtag";
import * as Fathom from 'fathom-client';

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

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('KHDVFLJB', {
      includedDomains: ['vimota.me'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
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
        // description="Disciplined reason in action."
        canonical="https://vimota.me/"
        openGraph={{
          url: "https://vimota.me/",
          title: "Victor Mota",
          type: "website",
          // description: "Disciplined reason in action.",
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
