/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      publicRuntimeConfig: {
        graphqlUrlClient: process.env.GRAPHQL_URL_CLIENT,
        toolbarColor: process.env.TOOLBAR_COLOR,
      },
      serverRuntimeConfig: {
        graphqlUrlSsr: process.env.GRAPHQL_URL_SSR,
      },
    };
  } else if (
    phase === PHASE_PRODUCTION_BUILD ||
    phase === PHASE_PRODUCTION_SERVER
  ) {
    return {
      publicRuntimeConfig: {
        graphqlUrlClient: process.env.GRAPHQL_URL_CLIENT,
        toolbarColor: process.env.TOOLBAR_COLOR,
      },
      serverRuntimeConfig: {
        graphqlUrlSsr: process.env.GRAPHQL_URL_SSR,
      },
      env: {},
    };
  }
};
