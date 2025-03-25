import React from 'react';

interface InputProps {
    placeholder?: string;
    disabled?: boolean;
    width?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, disabled = false, width = '90' }) => {
    return (
        <div className='w-full flex justify-center'>
            <input type='text' disabled={disabled} className={`input ${width === '90' ? 'w-90' : 'w-40'} ${disabled ? 'disabled' : ''}`} placeholder={placeholder}/>
        </div>
    );
};

export default Input;