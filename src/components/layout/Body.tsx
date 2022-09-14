import React from 'react';

import './Body.css';

const Body: React.FC<React.PropsWithChildren> = ({ children }) => {
   return (
      <main className='app-body'>
         {children}
      </main>
   )
}

export default Body;
