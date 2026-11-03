export type GameStatus = 'want' | 'playing' | 'completed' | 'dropped';
export type StatusFilter = GameStatus | 'all';

export type Game = {
    id: string;
    title: string;
    platform: string;
    status: GameStatus;
    rating: number | null;
    coverUrl: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
};

export type NewGame = {
    title: string;
    platform: string;
    status?: GameStatus;
    rating?: number | null;
    coverUrl?: string;
    notes?: string;
};

export type GameChanges = {
    title?: string;
    platform?: string;
    status?: GameStatus;
    rating?: number | null;
    coverUrl?: string;
    notes?: string;
};

export type ApiError = {
    message: string;
};
