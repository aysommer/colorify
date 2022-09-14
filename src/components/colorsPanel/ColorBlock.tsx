import React from 'react';
import { Color } from '../../types';

import './Color.css';

type Props = {
    color: Color
};

const ColorBlock: React.FC<Props> = ({ color }) => {
    const onColorSelect = (event: React.MouseEvent) => {
        const target = event.target as Node;
        const range = document.createRange();
        range.selectNode(target);
        window?.getSelection()?.removeAllRanges();
        window?.getSelection()?.addRange(range);
        window.navigator.clipboard.writeText(target.textContent as string);
    }

    const style = { backgroundColor: color.HEX };

    return (
        <section
            className="colors-panel__color"
            onClick={onColorSelect}
            style={style}>
            {color.HEX}
        </section>
    )
}

export default ColorBlock;
