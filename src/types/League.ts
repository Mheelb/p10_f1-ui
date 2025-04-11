import { UserLeague } from './UserLeague';

interface League {
    id: string;
    name: string;
    privateLeague: boolean;
    sharedLink: string;
    users: UserLeague[];
    maxPlayers: number;
}