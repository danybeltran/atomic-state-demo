import Head from "next/head";
import React, { useEffect, useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isInClient, setIsClient] = useState(false);

  useEffect(() => {
    /**
     * Why this? The first time this effect runs is in the browser
     * and the conditional render won't trigger the `expected matching 'div' warning
     */
    setIsClient(true);
  }, []);
  return (
    <div className="p-2">
      <Head>
        <title>Demo - Atomic state</title>
        <meta name="title" content="Demo - Atomic state" />
        <meta name="description" content="Demo for atomic-state" />
        <meta property="og:image" content="/preview-image.png"/>
        <meta />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-10 px-2 md:px-14">
        {
          // The conditional rendering:)
          isInClient && <Component {...pageProps} />
        }
      </div>
    </div>
  );
}

export default MyApp;
