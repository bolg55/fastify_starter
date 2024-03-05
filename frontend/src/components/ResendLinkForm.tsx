import { useEffect, useState } from 'react';
import { resendMagicLink } from '../utils/auth';
import { useNavigate } from '@tanstack/react-router';

const ResendLinkForm = () => {
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(9);

  const handleResendClick = async () => {
    setIsResending(true);
    await resendMagicLink(navigate);
    setIsResending(false);
  };

  useEffect(() => {
    // Start the countdown timer only if it's greater than 0
    if (countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timerId); // Cleanup the timer
    }
  }, [countdown]);

  return (
    <div className='flex flex-col flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
      <div className='max-w-sm p-4 mx-auto bg-white border-2 rounded-md shadow-md lg:w-96'>
        <div className='h-24'>
          <h2 className='text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Resend magic link
          </h2>
          <p className='mt-2 text-sm leading-6 text-gray-500'>
            Didn't receive the magic link?
          </p>{' '}
          {countdown > 0 && (
            <p className='text-gray-500'>
              You can resend the link in{' '}
              <span className='font-medium text-indigo-600'>{countdown}</span>{' '}
              seconds.
            </p>
          )}
        </div>
        <div className='mt-4'>
          <button
            onClick={handleResendClick}
            disabled={isResending || countdown > 0}
            className='flex w-full justify-center disabled:bg-gray-400 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors'
          >
            {isResending ? 'Resending...' : 'Resend Magic Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResendLinkForm;
