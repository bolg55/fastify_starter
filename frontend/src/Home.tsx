import { Link, useNavigate } from '@tanstack/react-router';
import Loader from './components/Loader';
import UpdateUserNameForm from './components/UpdateUserNameForm';
import { useAuth } from './hooks/useAuth';
import useUpdateUserName from './hooks/useUpdateUserName';
import { handleBillingPortal } from './utils';
import useProfile from './hooks/useProfile';
import { useQueryClient } from '@tanstack/react-query';

const Home = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { data, error, isLoading } = useProfile();

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
    if (isLoggedIn) {
      try {
        await logout();
        await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        navigate({ to: '/' });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      navigate({ to: '/auth' });
    }
  };

  return (
    <div className='max-w-5xl mx-auto mt-16'>
      <div className='flex items-center justify-end mb-16 space-x-4'>
        <button
          onClick={handleClick}
          className='px-4 py-2 text-white transition-all duration-100 bg-indigo-600 rounded hover:bg-indigo-700'
        >
          {isLoggedIn ? 'Sign Out' : 'Sign In'}
        </button>
        {isLoggedIn && (
          <button
            onClick={handleBillingPortal}
            className='px-4 py-2 text-white transition-all duration-100 bg-green-500 rounded hover:bg-green-600'
          >
            Billing Portal
          </button>
        )}
      </div>

      <h1 className='mb-6 text-6xl text-center'>
        Hello
        {isLoggedIn ? (
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
      {isLoggedIn && (
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
          <Link
            className='px-2 font-semibold text-indigo-400 rounded bg-slate-50'
            to='/auth'
          >
            /auth
          </Link>{' '}
          page to log in or sign up. Or click the SIGN IN button above.
        </li>
      </ol>

      <h2 className='mt-8 mb-2 text-4xl font-semibold text-red-400'>
        If a user is not logged in:
      </h2>
      <p>
        Going to{' '}
        <Link
          className='px-2 font-semibold text-indigo-400 rounded bg-slate-50'
          to='/secret'
        >
          /secret
        </Link>{' '}
        should result in a redirect to the <span>/auth</span> page
      </p>

      <h2 className='mt-8 mb-2 text-4xl font-semibold text-green-400'>
        If a user is logged in:
      </h2>
      <p>
        Going to{' '}
        <Link
          className='px-2 font-semibold text-indigo-400 rounded bg-slate-50'
          to='/secret'
        >
          /secret
        </Link>{' '}
        should result in a page with a button to fetch their profile data from
        the backend.{' '}
      </p>
    </div>
  );
};
export default Home;
