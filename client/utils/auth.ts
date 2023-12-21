import { GetServerSidePropsContext } from 'next';

export const isUserAuthenticated = (context: GetServerSidePropsContext) => {
  const cookies = context.req.cookies;
  return !!cookies['connect.sid'];
};
