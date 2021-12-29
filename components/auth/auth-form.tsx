import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { signIn } from 'next-auth/client';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';

export default function AuthForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | undefined>('');

  const getVisibility = (param: any) => {
    return param ? 'visible' : 'hidden';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (!result?.error) {
      router.replace('/');
      setAuthError(result?.error);
    } else {
      setAuthError(result?.error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Kullanıcı Adı"
                name="username"
                //autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Şifre"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText
                sx={{
                  height: '16px',
                  color: 'red',
                  visibility: `${getVisibility(authError)}`,
                }}
              >
                {authError}
              </FormHelperText>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Giriş yap
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
