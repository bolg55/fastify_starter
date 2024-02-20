import { useState } from 'react';

const getMe = async () => {
  const response = await fetch(
    'https://fastifystarter-production.up.railway.app/me'
  );
  return response.json(); // Return the parsed data directly
};

const Secret = () => {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    try {
      const responseData = await getMe();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex flex-col items-center align-middle max-w-4xl'>
      <h1 className='text-4xl mb-16'>
        This is a secret page. Click the Button
      </h1>
      <button
        className='bg-neutral-100 px-4 py-2 rounded text-indigo-500 font-medium hover:bg-indigo-500 hover:text-neutral-100 transition-colors duration-300 ease-in-out'
        onClick={handleClick}
      >
        Get Me
      </button>
      {data && (
        <>
          <h2 className='mt-16 mb-8 text-2xl'>
            You are successfully authenticated and have called the{' '}
            <code className='text-indigo-400 font-semibold bg-slate-50 px-2 rounded'>
              /me
            </code>{' '}
            endpoint.
          </h2>
          <pre className='bg-slate-900 rounded-md p-4 text-green-400'>
            {JSON.stringify(data, null, 2)}
          </pre>
          <a
            className='bg-indigo-500 font-semibold px-4 py-2 w-2/3 text-center rounded-md text-neutral-100 mt-8 hover:bg-indigo-400 transition-colors duration-300 ease-in-out'
            href='/'
          >
            Go Home
          </a>
        </>
      )}
    </div>
  );
};

export default Secret;
