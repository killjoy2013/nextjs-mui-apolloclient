import { List, ListItem, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { initializeApollo } from 'src/apollo';
import { Queries } from 'src/gql_definitions/queries';
import { CountriesQuery, Country } from 'src/graphql/types';

type LandingPageType = {
  countries: Country[];
};

export const LandingPage: React.FC<LandingPageType> = (props) => {
  const { countries } = props;

  return (
    <>
      <h1>Landing Page</h1>

      <List>
        {countries.map((country) => (
          <ListItem key={country.id}>
            <ListItemText
              primary={<h2>{country.name}</h2>}
              secondary={country.continent}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const {
    data: { countries },
  } = await apolloClient.query<CountriesQuery>({
    query: Queries.COUNTRIES,
    fetchPolicy: 'network-only',
  });

  return {
    props: {
      countries,
    },
    //revalidate: 30,
  };
}

export default LandingPage;
