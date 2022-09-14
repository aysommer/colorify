import React from 'react';
import { ButtonHTMLAttributes } from 'react';

import './Button.css';

const Button: React.FC<ButtonHTMLAttributes<unknown>> = ({ children, ...other }) => (
    <button className="simple-button" {...other}>
        {children}
    </button>
);

export default React.memo(Button);