import { useState } from 'react';

const UpdateUserNameForm = ({
  updateUserName,
  retry,
  isError,
  error,
  isLoading,
}: {
  updateUserName: (variables: { userName: string }) => void;
  retry: () => void;
  isError: boolean;
  error: Error | null;
  isLoading: boolean;
}) => {
  const [newUserName, setNewUserName] = useState('');

  const handleUpdateUserName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserName({ userName: newUserName });
    setNewUserName('');
  };

  return (
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
        disabled={isLoading}
      >
        Update
      </button>
      {isError && (
        <div className='mt-2'>
          <span className='text-red-500'>Error: {error?.message}</span>
          <button
            onClick={retry}
            className='px-4 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-600'
          >
            Retry
          </button>
        </div>
      )}
    </form>
  );
};
export default UpdateUserNameForm;
