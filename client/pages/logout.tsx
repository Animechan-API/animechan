import { GetServerSideProps } from 'next';
import nookies from 'nookies';

const Logout = () => {};

export const getServerSideProps: GetServerSideProps = async (context) => {
  nookies.destroy(context, 'connect.sid');
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};

export default Logout;
