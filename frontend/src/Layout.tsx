import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-slate-800 h-screen flex text-neutral-200 text-lg justify-center pt-16'>
      {children}
    </div>
  );
};
export default Layout;
