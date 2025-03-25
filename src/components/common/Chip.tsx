"use client";

import { FC, useEffect, useState } from 'react';

interface ChipProps {
  label: string;
  color?: string;
}

const Chip: FC<ChipProps> = ({ label, color }) => {
    const [defaultColor, setDefaultColor] = useState<string>('');

    useEffect(() => {
        if (color === "green")
            setDefaultColor('#9cc09c');
        else {
            const rootStyles = getComputedStyle(document.documentElement);
            const primaryWhite = rootStyles.getPropertyValue('--primary-white').trim();
            setDefaultColor(primaryWhite);
        }
    }, []);

    return (
        <div className='chip' style={{ backgroundColor: defaultColor }}>
            <p>{label}</p>
        </div>
    )
};

export default Chip;