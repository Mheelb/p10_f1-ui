import { UserLeague } from './UserLeague';

export interface League {
    id: string;
    name: string;
    isPrivate: boolean;
    sharedLink: string;
    users: UserLeague[];
    maxPlayers: number;
}