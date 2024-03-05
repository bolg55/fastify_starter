import { getMe, handleBillingPortal } from './utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UpdateUserNameForm from './components/UpdateUserNameForm';
import { logout } from './utils/auth';
import useUpdateUserName from './hooks/useUpdateUserName';
import Loader from './components/Loader';
import { useAuth } from './hooks/useAuth';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    enabled: !!isLoggedIn,
    queryKey: ['userProfile'],
    queryFn: getMe,
  });

  const {
    updateUserName,
    retry,
    isError,
    error: updateError,
    isPending,
    pendingUserName,
  } = useUpdateUserName();

  const userName = isPending ? pendingUserName : data?.data?.profile.userName;

  if (isLoading) {
    return <Loader text='Loading...' />;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  const handleClick = async () => {
    !data ? window.location.assign('/auth') : await logout(queryClient);
  };

  return (
    <div className='max-w-5xl'>
      <pre>{JSON.stringify(isLoggedIn, null, 2)}</pre>
      <div className='flex items-center justify-end mb-16 space-x-4'>
        <button
          onClick={handleClick}
          className='px-4 py-2 transition-all duration-100 bg-indigo-600 rounded hover:bg-indigo-700'
        >
          {data ? 'Sign Out' : 'Sign In'}
        </button>
        {data && (
          <button
            onClick={handleBillingPortal}
            className='px-4 py-2 transition-all duration-100 bg-green-500 rounded hover:bg-green-600'
          >
            Billing Portal
          </button>
        )}
      </div>

      <h1 className='mb-6 text-6xl text-center'>
        Hello
        {data ? (
          <>
            ,{' '}
            <span className={isPending ? 'opacity-50' : ''}>
              {userName ? userName : 'User'}
            </span>
          </>
        ) : (
          <span>. You're not signed in</span>
        )}
      </h1>
      {data && (
        <UpdateUserNameForm
          updateUserName={updateUserName}
          retry={retry}
          isError={isError}
          error={updateError}
          isLoading={isLoading}
        />
      )}

      <p>
        The main purpose of this frontend is to test login flow and
        authenticated routes. It is configured to use Vite, React, and Tailwind
        and can serve for the basis of a more complex frontend.
      </p>

      <h2 className='mt-8 mb-2 text-4xl font-semibold text-blue-400'>
        To start:
      </h2>
      <ol>
        <li>
          Head to the{' '}
          <a
            className='px-2 font-semibold text-indigo-400 rounded bg-slate-50'
            href='/auth'
          >
            /auth
          </a>{' '}
          page to log in or sign up. Or click the SIGN IN button above.
        </li>
      </ol>

      <h2 className='mt-8 mb-2 text-4xl font-semibold text-red-400'>
        If a user is not logged in:
      </h2>
      <p>
        Going to{' '}
        <a
          className='px-2 font-semibold text-indigo-400 rounded bg-slate-50'
          href='/secret'
        >
          /secret
        </a>{' '}
        should result in a redirect to the <span>/auth</span> page
      </p>

      <h2 className='mt-8 mb-2 text-4xl font-semibold text-green-400'>
        If a user is logged in:
      </h2>
      <p>
        Going to{' '}
        <a
          className='px-2 font-semibold text-indigo-400 rounded bg-slate-50'
          href='/secret'
        >
          /secret
        </a>{' '}
        should result in a page with a button to fetch their profile data from
        the backend.{' '}
      </p>
    </div>
  );
};
export default Home;
