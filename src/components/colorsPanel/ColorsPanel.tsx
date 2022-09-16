import React from 'react';
import { observer } from 'mobx-react';
import ColorBlock from './ColorBlock';
import store from '../../store';

import './ColorsPanel.css';

const ColorsPanel: React.FC = observer(() => {
   if (store.colors.length === 0) {
      return null;
   }

   return (
      <section className="colors-panel">
         {
            store.colors.map((color, index) => <ColorBlock key={index} color={color} />)
         }
      </section>
   )
});


export default ColorsPanel;