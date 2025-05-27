import { UserLeague } from './UserLeague';

export interface League {
    id: string;
    leagueName: string;
    isPrivate: boolean;
    joinCode: string;
    users: UserLeague[];
    maxParticipants: number;
}