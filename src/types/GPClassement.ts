import { Pilote } from './Pilote';
import { GP } from './GP';

export interface GPClassement {
    id: string;
    race: GP;
    pilote: Pilote;
    isDNF: boolean;
    position: number;
    time: string;
    points: number;
}