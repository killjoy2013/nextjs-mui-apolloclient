import 'styles/global.css';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'next-auth/client';
import { useApollo } from 'src/apollo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'styles/createEmotionCache';
import theme from 'styles/theme';
import React from 'react';
import Layout from 'components/layout';

const clientSideEmotionCache = createEmotionCache();

const landingPages = ['/landing', '/login'];

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  router,
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const client = useApollo(pageProps.token, pageProps.initialApolloState);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>MUI5 Nextjs</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider session={pageProps.session}>
          <ApolloProvider client={client}>
            {landingPages.includes(router.pathname) && (
              <Component {...pageProps} />
            )}

            {!landingPages.includes(router.pathname) && (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </ApolloProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
