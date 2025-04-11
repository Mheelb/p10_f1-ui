import { GP } from "./GP";
import { User } from "./User";
import { Pilote } from "./Pilote";

interface BetSelectionResult {
    id: string;
    user: User;
    gp: GP;
    pointsP10?: number;
    piloteP10: Pilote;
}