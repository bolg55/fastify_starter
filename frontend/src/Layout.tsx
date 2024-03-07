import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='text-lg bg-white  text-neutral-600'>{children}</div>;
};
export default Layout;
