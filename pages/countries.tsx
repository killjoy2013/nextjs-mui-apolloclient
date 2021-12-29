import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import MyAlert from 'components/alert';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { getToken } from 'next-auth/jwt';
import React, { FC, useCallback, useEffect } from 'react';
import { initializeApollo } from 'src/apollo';
import { alertMessageVar } from 'src/cache';
import { Queries } from 'src/gql_definitions/queries';
import {
  CountriesQuery,
  useCountriesQuery,
  useRemoveCountryMutation,
} from 'src/graphql/types';

interface SessionWithRightsType extends Session {
  rights: string[];
}

type CountriesType = {
  initialApolloState: any;
  token: string;
  session: SessionWithRightsType;
};

const Countries: FC<CountriesType> = (props) => {
  const { session } = props;
  const { data, loading, error } = useCountriesQuery();
  const [removeCountry] = useRemoveCountryMutation({
    update(cache, { data: { removeCountry: removedId } }) {
      const { countries: oldCountries } = cache.readQuery<CountriesQuery>({
        query: Queries.COUNTRIES,
      });

      cache.writeQuery<CountriesQuery>({
        query: Queries.COUNTRIES,
        data: {
          countries: oldCountries.filter((f) => f.id != removedId),
        },
      });
    },
  });
  useEffect(() => {
    alertMessageVar(undefined);
  }, []);

  const displayDelete = useCallback(
    (countryId: number) => {
      if (session?.rights?.includes('removeCountry')) {
        return (
          <IconButton
            onClick={async () => {
              try {
                await removeCountry({
                  variables: {
                    id: countryId,
                  },
                });
              } catch (error) {}
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      } else {
        return null;
      }
    },
    [session]
  );

  return (
    <>
      <h1>Countries</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Continent</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.countries.map((country) => (
            <TableRow key={country.id}>
              <TableCell>{country.name}</TableCell>
              <TableCell>{country.continent}</TableCell>
              {/* <TableCell>{displayDelete(country.id)}</TableCell> */}
              <TableCell>
                <IconButton
                  onClick={async () => {
                    try {
                      await removeCountry({
                        variables: {
                          id: country.id,
                        },
                      });
                    } catch (error) {}
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MyAlert />
    </>
  );
};

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permenant: false,
      },
    };
  }

  const token = await getToken({
    req,
    secret: process.env.TOKEN_SECRET,
    raw: true,
  });

  const apolloClient = initializeApollo(token);
  await apolloClient.query({
    query: Queries.COUNTRIES,
    fetchPolicy: 'network-only',
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      session,
      token,
    },
  };
}

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();
//   const {
//     data: { countries },
//   } = await apolloClient.query<CountriesQuery>({
//     query: Queries.COUNTRIES,
//     fetchPolicy: 'network-only',
//   });

//   let normCache = apolloClient.cache.extract();

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 20,
//   };
// }

export default Countries;
