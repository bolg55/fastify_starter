import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex justify-center h-screen pt-16 text-lg bg-slate-800 text-neutral-200'>
      {children}
    </div>
  );
};
export default Layout;
