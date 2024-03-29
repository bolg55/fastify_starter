const Loader = ({ text }: { text?: string }) => {
  return (
    <div className='z-10 flex items-center justify-center h-screen space-x-4'>
      <div className='w-16 h-16 mr-2 border-8 border-green-500 rounded-full animate-spin border-t-transparent'></div>
      <span className='text-2xl font-medium'>{text}</span>
    </div>
  );
};
export default Loader;
