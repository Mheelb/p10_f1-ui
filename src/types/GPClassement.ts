import { Pilote } from './Pilote';
import { GP } from './GP';

interface GPClassement {
    id: string;
    race: GP;
    pilote: Pilote;
    isDNF: boolean;
    position: number;
}