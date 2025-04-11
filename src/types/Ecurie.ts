import { Pilote } from './Pilote';

interface Ecurie {
    id: string;
    name: string;
    logo: string;
    color: string;
    pilotes: Pilote[];
}