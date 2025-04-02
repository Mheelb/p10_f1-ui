import React from 'react';

interface InputProps {
    placeholder?: string;
    disabled?: boolean;
    width?: string;
    type?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ 
    placeholder, 
    disabled = false, 
    width = '90', 
    type = 'text',
    name, 
    value, 
    onChange 
}) => {
    return (
        <div className='w-full flex justify-center'>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`input ${width === '90' ? 'w-90' : 'w-40'} ${disabled ? 'disabled' : ''}`}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;