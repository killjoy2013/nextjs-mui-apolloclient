import { GetStaticProps } from 'next';

const OtherStaticPage = () => {
  return <div>This is other static page...</div>;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default OtherStaticPage;
