import { NormalizedCache } from '@apollo/client';
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
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { getToken } from 'next-auth/jwt';
import React, { FC, useEffect } from 'react';
import { initializeApollo } from 'src/apollo';
import { alertMessageVar } from 'src/cache';
import { Queries } from 'src/gql_definitions/queries';
import {
  CitiesQuery,
  useCitiesQuery,
  useRemoveCityMutation,
} from 'src/graphql/types';

type CitiesType = {
  initialApolloState: NormalizedCache;
  alertMessage: string;
  session: Session;
};

const Cities: FC<CitiesType> = (props) => {
  const { session } = props;
  const { data, loading, error } = useCitiesQuery();
  const [
    removeCity,
    { data: removeData, loading: removeLoading, error: removeError },
  ] = useRemoveCityMutation({
    update(cache, { data: { removeCity: removedId } }) {
      const { cities: oldCities } = cache.readQuery<CitiesQuery>({
        query: Queries.CITIES,
      });

      cache.writeQuery<CitiesQuery>({
        query: Queries.CITIES,
        data: {
          cities: oldCities.filter((f) => f.id != removedId),
        },
      });
    },
  });

  useEffect(() => {
    alertMessageVar(undefined);
  }, []);

  return (
    <>
      <h1>Cities</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Continent</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.cities.map((city) => (
            <TableRow key={city.id}>
              <TableCell>{city.name}</TableCell>
              <TableCell>
                <IconButton
                  onClick={async () => {
                    try {
                      await removeCity({
                        variables: {
                          id: city.id,
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
    query: Queries.CITIES,
    fetchPolicy: 'network-only',
  });

  let normCache = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState: normCache,
      session,
      token,
    },
  };
  //   const apolloClient = initializeApollo();

  //   const {
  //     data: { cities },
  //   } = await apolloClient.query<CitiesQuery>({
  //     query: Queries.COUNTRIES,
  //     fetchPolicy: 'network-only',
  //   });

  //   return {
  //     props: {
  //       cities,
  //     },
  //   };
}

export default Cities;
