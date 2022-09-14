import React from 'react';
import { Color } from '../../types';
import ColorBlock from './ColorBlock';

import './ColorsPanel.css';

interface IColorsPanel {
   colors: Color[];
}

const ColorsPanel: React.FC<IColorsPanel> = ({ colors }) => (
   <section className="colors-panel">
      {
         colors.map((color, index) => <ColorBlock key={index} color={color} />)
      }
   </section>
)


export default ColorsPanel;