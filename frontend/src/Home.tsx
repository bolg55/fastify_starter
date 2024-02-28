import React, { useEffect, useState } from 'react';
import { getMe, getCustomerPortalUrl, updateMe } from './utils';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartypasswordless';

const Home = () => {
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState('');
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    const response = getMe();
    response.then((data) => {
      setData(data.message);
      setUserName(data.data.profile.userName);
    });
  }, []);

  const logout = async () => {
    await signOut();
    window.location.href = '/';
  };

  const handleClick = async () => {
    data === 'unauthorised' ? window.location.assign('/auth') : await logout();
  };

  const handleBillingPortal = async () => {
    const { url, status, message } = await getCustomerPortalUrl();
    if (status === 'success') {
      window.location.href = url;
    } else {
      console.error(message);
    }
  };

  const handleUpdateUserName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, message } = await updateMe({ userName: newUserName });
    if (status === 'success') {
      setUserName(newUserName);
      setNewUserName('');
      alert('Username updated successfully!');
    } else {
      console.error(message);
      alert('Failed to update username.');
    }
  };

  return (
    <div className='max-w-4xl'>
      <div className='flex justify-end space-x-4'>
        <button
          onClick={handleClick}
          className='px-4 py-2 transition-all duration-100 bg-indigo-600 rounded hover:bg-indigo-700'
        >
          {data === 'unauthorised' ? 'Sign In' : 'Sign Out'}
        </button>
        {data !== 'unauthorised' && (
          <button
            onClick={handleBillingPortal}
            className='px-4 py-2 transition-all duration-100 bg-green-500 rounded hover:bg-green-600'
          >
            Billing Portal
          </button>
        )}
      </div>

      <h1 className='mb-6 text-6xl text-center'>
        Welcome to the frontend
        {data !== 'unauthorised' && `, ${userName ? userName : 'User'}`}
      </h1>
      {data !== 'unauthorised' && (
        <form
          className='flex items-center justify-center my-16 space-x-4 '
          onSubmit={handleUpdateUserName}
        >
          <label htmlFor='newUserName'>Change Username:</label>
          <input
            className='p-2 font-medium text-gray-800 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            type='text'
            id='newUserName'
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
          <button
            className='px-4 py-2 transition-all duration-100 bg-indigo-600 rounded hover:bg-indigo-700'
            type='submit'
          >
            Update
          </button>
        </form>
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
