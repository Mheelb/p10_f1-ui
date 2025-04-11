import { UserLeague } from './UserLeague';
import { BetSelectionResult } from './BetSelectionResult';

interface User {
    id: string;
    email: string;
    username: string;
    leagues?: UserLeague[];
    bets?: BetSelectionResult[];
}