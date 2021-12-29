import { getSession } from 'next-auth/client';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';

const Homepage = () => {
  return (
    <Grid container direction="column" justifyContent="space-between">
      <Grid item>
        <Typography variant="h4">Home Page</Typography>
      </Grid>
    </Grid>
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

  return {
    props: {
      session,
      token,
    },
  };
}
export default Homepage;
