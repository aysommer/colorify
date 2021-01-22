import React from 'react';

import './Color.scss';

export type TColor = {
    HEX: string;
}

interface IColor {
    color: TColor
}

const Color: React.FC<IColor> = ({ color }) => {
    const onColorSelect = (e: React.MouseEvent) => {
        const target: any = e.target;

        const range = document.createRange();
        range.selectNode(target);
        // @ts-ignore
        window.getSelection().removeAllRanges();
        // @ts-ignore
        window.getSelection().addRange(range);
        document.execCommand('copy');
    }

    const { HEX } = color;
    const style = { backgroundColor: HEX };

    return (
        <div
            className="colors-panel__color"
            onClick={onColorSelect}
            style={style}
        >
            {HEX}
        </div>
    )
}

export default Color;
