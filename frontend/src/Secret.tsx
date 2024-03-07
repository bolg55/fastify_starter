import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { getMe } from './utils';

const Secret = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const responseData = await getMe();
      setData(responseData);
      toast.success('Data fetched successfully');
      setIsLoading(false);
    } catch (error) {
      toast.error(`Error fetching data: ${error}`);
    }
  };

  return (
    <div className='flex flex-col items-center max-w-4xl mx-auto mt-16 align-middle'>
      <h1 className='mb-16 text-4xl'>
        This is a secret page. Click the Button
      </h1>
      <button
        disabled={isLoading}
        className='px-4 py-2 font-medium text-indigo-500 transition-colors duration-300 ease-in-out rounded disabled:text-neutral-100 bg-neutral-100 disabled:bg-indigo-500 hover:text-neutral-100'
        onClick={handleClick}
      >
        {isLoading ? (
          <div className='flex items-center space-x-2'>
            <div className='w-5 h-5 border-2 rounded-full border-neutral-100 animate-spin border-t-transparent'></div>
            <span>{data ? 'Refresh' : 'Get Me'}</span>
          </div>
        ) : (
          <span>{data ? 'Refresh' : 'Get Me'}</span>
        )}
      </button>
      {data && (
        <>
          <Link
            className='w-2/3 px-4 py-2 mt-8 font-semibold text-center transition-colors duration-300 ease-in-out bg-indigo-500 rounded-md text-neutral-100 hover:bg-indigo-400'
            to='/'
          >
            Go Home
          </Link>
          <h2 className='my-8 text-2xl '>
            You are successfully authenticated and have called the{' '}
            <code className='px-2 font-semibold text-indigo-400 rounded bg-slate-50'>
              /me
            </code>{' '}
            endpoint.
          </h2>
          <pre className='p-4 text-green-400 rounded-md bg-slate-900'>
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
};

export default Secret;
