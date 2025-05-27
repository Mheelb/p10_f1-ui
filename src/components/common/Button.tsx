"use client";

import { FC } from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    color?: string;
    width?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({ onClick, children, disabled = false, color = 'primary', width = '90', type = 'button' }) => {
    return (
        <div className='w-full flex justify-center'>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`button ${color} ${width === '90' ? 'w-90' : 'w-40'} ${disabled ? 'disabled' : ''}`}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;