import { InMemoryCache, makeVar } from '@apollo/client';
import { AlertColor } from '@mui/material/Alert';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        countries: {
          merge: (existing, incoming) => {
            return incoming;
          },
        },
        cities: {
          merge: (existing, incoming) => {
            return incoming;
          },
        },
      },
    },
  },
});

export const cityParamVar = makeVar<string>('');

export type MessageType = {
  severity: AlertColor;
  message: string;
};

export const alertMessageVar = makeVar<MessageType>(undefined);
