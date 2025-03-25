import React from 'react';

interface DriverClassificationProps {
  result: {
    position: number;
    driver: {
      trigram: string;
    };
    team: {
      color: string;
    };
    timer: string;
    points: number;
  };
  index: number;
}

const DriverClassification: React.FC<DriverClassificationProps> = ({ result, index }) => {
  return (
    <div key={index} className='grid grid-cols-5 justify-items-center body-classification'>
      <h1>{result.position}</h1>
      <div className='trigram flex items-center'>
        <div className='team-color-rectangle' style={{ backgroundColor: result.team.color }}></div>
        <h1 className='team-name'>{result.driver.trigram}</h1>
      </div>
      <h1 className='col-span-2'>{result.timer}</h1>
      <h1>{result.points}</h1>
    </div>
  );
};

export default DriverClassification;