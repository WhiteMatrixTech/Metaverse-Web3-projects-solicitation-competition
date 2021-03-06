import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
      <>
        <Head>
          <title>Mega Tower</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="./favicon.ico" />
        </Head>
          {getLayout(<Component {...pageProps} />)}
      </>
  );

}

