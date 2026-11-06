export type GameStatus = 'want' | 'playing' | 'completed' | 'dropped';
export type StatusFilter = GameStatus | 'all';

export interface Game {
    id: string;
    title: string;
    platform: string;
    status: GameStatus;
    rating: number | null;
    coverUrl: string;
    notes: string;
}

export type NewGame = Pick<Game, 'title' | 'platform' | 'status'>;
export type GameUpdate = Partial<Omit<Game, 'id'>>;
