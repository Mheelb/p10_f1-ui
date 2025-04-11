import { Ecurie } from './Ecurie';

export interface Pilote {
    id: string;
    name: string;
    picture: string;
    trigram: string;
    ecurie: Ecurie;
}