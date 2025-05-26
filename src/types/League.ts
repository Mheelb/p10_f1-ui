import { UserLeague } from './UserLeague';

export interface League {
    id: string;
    leagueName: string;
    isPrivate: boolean;
    sharedLink: string;
    users: UserLeague[];
    maxParticipants: number;
}