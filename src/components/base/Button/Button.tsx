import React from 'react';
import { ButtonHTMLAttributes } from 'react';

import './Button.scss';
  
const Button: React.FC<ButtonHTMLAttributes<unknown>> = ({children, type, disabled, onClick }) => (
    <button
        className="simple-button"
        type={type}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </button>
);

export default React.memo(Button);