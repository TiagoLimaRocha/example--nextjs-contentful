import { ApolloLink, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { logger, LOG } from '@clients/Logger';

import { POLICY_TYPE } from './types';

const CONTENTFUL_CLIENT_CONFIG = {
  space: String(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID),
  environment: String(process.env.NEXT_PUBLIC_CONTENTFUL_MASTER_ENV),
  accessToken: String(process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_DELIVERY_API_KEY),
};

const client = new ApolloClient({
  ssrMode: true,
  ssrForceFetchDelay: 100,
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          logger.error(
            {
              message,
              locations,
              path,
            },
            LOG.ERROR.CLIENTS.APOLLO.LINK,
          ),
        );
      }
      if (networkError) {
        logger.error({ error: networkError }, LOG.ERROR.CLIENTS.APOLLO.LINK);
      }
    }),
    new HttpLink({
      uri: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_CLIENT_CONFIG['space']}/environments/${CONTENTFUL_CLIENT_CONFIG['environment']}`,
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${CONTENTFUL_CLIENT_CONFIG['accessToken']}`,
      },
    }),
  ]),
  defaultOptions: {
    query: {
      fetchPolicy: POLICY_TYPE.NO_CACHE,
    },
    mutate: {
      fetchPolicy: POLICY_TYPE.NO_CACHE,
    },
    watchQuery: {
      fetchPolicy: POLICY_TYPE.NO_CACHE,
    },
  },
});

export default client;
