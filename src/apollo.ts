import { getToken } from 'next-auth/jwt';
import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import getConfig from 'next/config';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { alertMessageVar, cache } from './cache';
import { getSession } from 'next-auth/client';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
let apolloClient: ApolloClient<NormalizedCacheObject>;
type InitialState = NormalizedCacheObject | null;

let myToken: string = '';

function getMyToken() {
  return myToken;
}

export function initializeApollo(
  token: string = null,
  initialState: InitialState = null
) {
  myToken = token;

  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps

    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;
  return apolloClient;
}

const customFetch = async (uri: any, options: any) => {
  let foundToken = getMyToken();
  //if (!foundToken) throw new Error('NO TOKEN....');
  options.headers.Authorization = `Bearer ${foundToken}`;
  return fetch(uri, options);
};

function createIsomorphicLink() {
  const { HttpLink } = require('@apollo/client/link/http');

  let uri =
    typeof window === 'undefined'
      ? serverRuntimeConfig.graphqlUrlSsr
      : publicRuntimeConfig.graphqlUrlClient;

  let httpLink = new HttpLink({
    uri,
    fetch: customFetch,
  });

  return httpLink;
}

const errorLink = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors) {
    let wholeMessage = graphQLErrors.map((m) => m.message).join(' - ');

    alertMessageVar({ severity: 'error', message: wholeMessage });
  }
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === undefined,
    link: ApolloLink.from([errorLink, createIsomorphicLink()]),
    cache: cache,
  });
}

export function useApollo(token: string, initialState: InitialState) {
  const store = useMemo(
    () => initializeApollo(token, initialState),
    [token, initialState]
  );

  return store;
}
