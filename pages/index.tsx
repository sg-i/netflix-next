import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import useCurrentUser from '../hooks/useCurrentUser';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return { props: {} };
}

const Home = () => {
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="text-2xl text-green-500">Neflix Clone</h1>
      <p className="text-white">Logged in as : {user?.name}</p>
      <button className="bg-red-500 text-white p-3 mt-2" onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
};

export default Home;
