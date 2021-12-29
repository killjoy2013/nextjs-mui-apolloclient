import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import MyAlert from 'components/alert';
import { getSession } from 'next-auth/client';
import { getToken } from 'next-auth/jwt';
import React, { FC, useEffect, useState } from 'react';
import { initializeApollo } from 'src/apollo';
import { alertMessageVar } from 'src/cache';
import { Queries } from 'src/gql_definitions/queries';
import {
  CountriesQuery,
  Country,
  CreateCityInput,
  useCreateCityMutation,
} from 'src/graphql/types';

type AddCityType = {
  countries: Country[];
  alertMessage: string;
};

const AddCity: FC<AddCityType> = (props) => {
  const { countries, alertMessage } = props;
  const [cityData, setCityData] = useState<CreateCityInput>({
    name: '',
    population: undefined,
    countryId: 0,
  });

  const [createCity, { data, loading, error }] = useCreateCityMutation();
  useEffect(() => {
    data && alertMessageVar({ severity: 'success', message: 'success' });
    loading && alertMessageVar({ severity: 'info', message: 'progress...' });
    error && alertMessageVar({ severity: 'error', message: 'error :-(' });
  }, [data, loading, error]);

  useEffect(() => {
    alertMessageVar(undefined);
  }, []);

  return (
    <>
      <h1>Add City</h1>
      <Grid container direction="column" spacing={2} sx={{ width: '500px' }}>
        <Grid item>
          <TextField
            label="City name"
            value={cityData.name}
            onChange={(e) => setCityData({ ...cityData, name: e.target.value })}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Population"
            value={cityData.population}
            onChange={(e) => {
              let population = e.target.value
                ? Number(e.target.value)
                : undefined;

              setCityData({
                ...cityData,
                population,
              });
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" sx={{ minWidth: 220 }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={cityData.countryId}
              label="Country"
              onChange={(e) =>
                setCityData({
                  ...cityData,
                  countryId: e.target.value as number,
                })
              }
            >
              {countries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              createCity({
                variables: {
                  input: { ...cityData },
                },
              });
            }}
          >
            Create
          </Button>
        </Grid>
        <Grid item>
          <MyAlert />
        </Grid>
      </Grid>
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

  const {
    data: { countries },
  } = await apolloClient.query<CountriesQuery>({
    query: Queries.COUNTRIES,
    fetchPolicy: 'network-only',
  });

  return {
    props: {
      countries,
      token,
    },
  };
}

export default AddCity;
