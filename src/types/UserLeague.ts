import { League } from './League';
import { User } from './User';

export interface UserLeague {
    id: string;
    league: League;
    user: User;
    admin: boolean;
}