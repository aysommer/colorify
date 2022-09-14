import React from 'react';

import './MainPanel.css';

const MainPanel: React.FC<React.PropsWithChildren> = ({ children }) => {
   return (
      <main className="main-panel">
         {children}
      </main>
   )
}

export default MainPanel;
