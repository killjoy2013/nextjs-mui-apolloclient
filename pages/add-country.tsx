import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { width } from '@mui/system';
import MyAlert from 'components/alert';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';
import { getToken } from 'next-auth/jwt';
import React, { FC, useEffect, useState } from 'react';
import { alertMessageVar } from 'src/cache';
import {
  Continent,
  CreateCountryInput,
  useCreateCountryMutation,
} from 'src/graphql/types';

type AddCountryType = {
  alertMessage: string;
};

const AddCountry: FC<AddCountryType> = (props) => {
  const { alertMessage } = props;
  const [countryData, setCountryData] = useState<CreateCountryInput>({
    name: '',
    population: undefined,
    continent: Continent.Asia,
  });

  const [createCountry, { data, loading, error }] = useCreateCountryMutation();

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
      <h1>Add Country</h1>
      <Grid container direction="column" spacing={2} sx={{ width: '500px' }}>
        <Grid item>
          <TextField
            label="Country name"
            value={countryData.name}
            onChange={(e) =>
              setCountryData({ ...countryData, name: e.target.value })
            }
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Population"
            value={countryData.population}
            onChange={(e) => {
              let population = e.target.value
                ? Number(e.target.value)
                : undefined;

              setCountryData({
                ...countryData,
                population,
              });
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" sx={{ minWidth: 220 }}>
            <InputLabel id="demo-simple-select-label">Continent</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countryData.continent}
              label="Continent"
              onChange={(e) =>
                setCountryData({
                  ...countryData,
                  continent:
                    Continent[e.target.value as keyof typeof Continent],
                })
              }
            >
              {(Object.keys(Continent) as Array<keyof typeof Continent>).map(
                (key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              createCountry({
                variables: {
                  input: { ...countryData },
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

  alertMessageVar(undefined);

  console.log('alertMessageVar undefined set');

  return {
    props: {
      session,
      token,
    },
  };
}

export default AddCountry;
