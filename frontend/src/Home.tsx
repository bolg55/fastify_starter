import { useEffect, useState } from 'react';
import { getMe } from './utils';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartypasswordless';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const response = getMe();
    response.then((data) => {
      setData(data.message);
    });
  }, []);

  const logout = async () => {
    await signOut();
    window.location.href = '/';
  };

  const handleClick = async () => {
    data === 'unauthorised' ? window.location.assign('/auth') : await logout();
  };

  return (
    <div className='max-w-4xl'>
      <div className='flex justify-end'>
        <button
          onClick={handleClick}
          className='bg-indigo-500 rounded px-4 py-2 hover:bg-indigo-700 transition-all duration-100'
        >
          {data === 'unauthorised' ? 'Sign In' : 'Sign Out'}
        </button>
      </div>

      <h1 className='text-6xl text-center mb-6'>Welcome to the frontend</h1>

      <p>
        The main purpose of this frontend is to test login flow and
        authenticated routes. It is configured to use Vite, React, and Tailwind
        and can serve for the basis of a more complex frontend.
      </p>

      <h2 className='text-4xl font-semibold text-blue-400 mt-8 mb-2'>
        To start:
      </h2>
      <ol>
        <li>
          Head to the{' '}
          <a
            className='text-indigo-400 font-semibold bg-slate-50 px-2 rounded'
            href='/auth'
          >
            /auth
          </a>{' '}
          page to log in or sign up. Or click the SIGN IN button above.
        </li>
      </ol>

      <h2 className='text-4xl font-semibold text-red-400 mt-8 mb-2'>
        If a user is not logged in:
      </h2>
      <p>
        Going to{' '}
        <a
          className='text-indigo-400 font-semibold bg-slate-50 px-2 rounded'
          href='/secret'
        >
          /secret
        </a>{' '}
        should result in a redirect to the <span>/auth</span> page
      </p>

      <h2 className='text-4xl font-semibold text-green-400 mt-8 mb-2'>
        If a user is logged in:
      </h2>
      <p>
        Going to{' '}
        <a
          className='text-indigo-400 font-semibold bg-slate-50 px-2 rounded'
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
