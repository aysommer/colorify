import React, { useEffect } from 'react';
import Color, { TColor } from '../Color/Color';

import './ColorsPanel.scss';

interface IColorsPanel {
    colors: TColor[];
}

const ColorsPanel: React.FC<IColorsPanel> = ({ colors }) => {
    useEffect(() => window.scrollTo(0, document.body.scrollHeight));

    return <section className="colors-panel">
        {
            colors.map((color, index) => <Color
                key={index}
                color={color}
            />)
        }
    </section>
}

export default ColorsPanel;