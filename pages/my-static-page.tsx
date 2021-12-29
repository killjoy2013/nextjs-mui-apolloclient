import { GetStaticProps } from 'next';

const MyStaticPage = () => {
  return <div>This is my static page...</div>;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default MyStaticPage;
