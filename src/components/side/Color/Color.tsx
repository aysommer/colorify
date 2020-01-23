import React from 'react';

import './Color.scss';

export type TColor = {
    HEX: string;
}

interface IColor {
    color: TColor
}

const Color: React.FC<IColor> = ({ color }) => {
    const HEX = color.HEX;

    return <div
        className="colors-panel__color"
        style={{ backgroundColor: HEX }}
    >
        {HEX}
    </div>
}

export default Color;
