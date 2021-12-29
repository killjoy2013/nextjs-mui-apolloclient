import AuthForm from 'components/auth/auth-form';
import { getSession } from 'next-auth/client';
import { GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';

const Login = () => {
  return <AuthForm />;
};

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });

  const token = await getToken({
    req,
    secret: process.env.TOKEN_SECRET,
    raw: true,
  });

  if (session && token) {
    return {
      redirect: {
        destination: '/',
        permenant: false,
      },
      props: {
        session,
        token,
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
}

export default Login;
