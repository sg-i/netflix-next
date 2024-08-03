import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useCurrentUser from '../hooks/useCurrentUser';
import { useRouter } from 'next/router';

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

  return {
    props: {},
  };
}

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-3xl md:text-4xl text-center">Who is watching?</h1>
        <div className="flex items-center justify-center mt-7">
          <div onClick={() => router.push('/')}>
            <div className="group flex-row w-40  mx-auto ">
              <div className="rounded-md w-40 h-40 flex border-2 border-transparent overflow-hidden group-hover:cursor-pointer group-hover:border-white transition">
                <img src="/images/default-blue.png" alt="Profile" />
              </div>
              <div className="text-gray-400 text-center mt-2 group-hover:cursor-pointer group-hover:text-white transition">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profiles;
