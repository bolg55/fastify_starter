import { useState } from 'react';
import { getMe } from './utils';
import Loader from './components/Loader';

const Secret = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const responseData = await getMe();
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (isLoading) {
    return <Loader text='Loading...' />;
  }

  return (
    <div className='flex flex-col items-center max-w-4xl align-middle'>
      <h1 className='mb-16 text-4xl'>
        This is a secret page. Click the Button
      </h1>
      <button
        className='px-4 py-2 font-medium text-indigo-500 transition-colors duration-300 ease-in-out rounded bg-neutral-100 hover:bg-indigo-500 hover:text-neutral-100'
        onClick={handleClick}
      >
        Get Me
      </button>
      {data && (
        <>
          <h2 className='mt-16 mb-8 text-2xl'>
            You are successfully authenticated and have called the{' '}
            <code className='px-2 font-semibold text-indigo-400 rounded bg-slate-50'>
              /me
            </code>{' '}
            endpoint.
          </h2>
          <pre className='p-4 text-green-400 rounded-md bg-slate-900'>
            {JSON.stringify(data, null, 2)}
          </pre>
          <a
            className='w-2/3 px-4 py-2 mt-8 font-semibold text-center transition-colors duration-300 ease-in-out bg-indigo-500 rounded-md text-neutral-100 hover:bg-indigo-400'
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
