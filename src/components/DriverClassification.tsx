import { GPClassement } from '@/types/GPClassement';
import React from 'react';

interface DriverClassificationProps {
  result: GPClassement;
  index: number;
};

const DriverClassification: React.FC<DriverClassificationProps> = ({ result, index }) => {
  return (
    <div key={index} className='grid grid-cols-5 justify-items-center body-classification'>
      <h1>{result.position}</h1>
      <div className='trigram flex items-center'>
        <div className='team-color-rectangle' style={{ backgroundColor: result.pilote.ecurie.color }}></div>
        <h1 className='team-name'>{result.pilote.trigram}</h1>
      </div>
      <h1 className='col-span-2'>{result.time}</h1>
      <h1>{result.points}</h1>
    </div>
  );
};

export default DriverClassification;