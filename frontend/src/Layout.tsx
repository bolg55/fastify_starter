import { Outlet } from '@tanstack/react-router';

const Layout = () => {
  return (
    <div className='flex justify-center h-screen pt-16 text-lg bg-slate-800 text-neutral-200'>
      <Outlet />
    </div>
  );
};
export default Layout;
