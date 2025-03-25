'use client';

import { FC } from 'react';
import Button from '@/components/common/Button';

const BetCard: FC = () => {
    return (
        <div className='bet-card w-90 '>
            <Button onClick={() => console.log('clicked')}>Bet</Button>
        </div>
    )
}

export default BetCard;