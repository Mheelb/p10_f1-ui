import { UserLeague } from './UserLeague';

export interface League {
    id: string;
    name: string;
    privateLeague: boolean;
    sharedLink: string;
    users: UserLeague[];
    maxPlayers: number;
}