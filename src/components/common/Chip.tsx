"use client";

import { FC, useEffect, useState } from 'react';

interface ChipProps {
  label: string;
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const Chip: FC<ChipProps> = ({ label, color, isSelected, onClick }) => {
    const [defaultColor, setDefaultColor] = useState<string>('');

    useEffect(() => {
        if (color === "green")
            setDefaultColor('#9cc09c');
        else {
            const rootStyles = getComputedStyle(document.documentElement);
            const primaryWhite = rootStyles.getPropertyValue('--primary-white').trim();
            setDefaultColor(primaryWhite);
        }
    }, [color]);

    return (
        <div
            className={`chip cursor-pointer px-4 py-2 rounded-lg ${
                isSelected ? 'border-2 border-primary' : 'border border-gray-300'
            }`}
            style={{ backgroundColor: defaultColor }}
            onClick={onClick}
        >
            <p className="text-sm font-medium">{label}</p>
        </div>
    );
};

export default Chip;