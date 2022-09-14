import React from 'react';
import Color, { TColor } from './Color';

import './ColorsPanel.css';

interface IColorsPanel {
    colors: TColor[];
}

const ColorsPanel: React.FC<IColorsPanel> = ({ colors }) => (
    <section className="colors-panel">
    {
        colors.map((color, index) => <Color
            key={index}
            color={color}
        />)
    }
    </section>
)


export default ColorsPanel;