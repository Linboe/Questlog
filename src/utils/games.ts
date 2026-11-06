import type { Game, GameUpdate, NewGame, StatusFilter } from '../types';
import { request } from './client';

export function getGames(status: StatusFilter): Promise<Game[]> {
    const query = status === 'all' ? '' : `?status=${status}`;
    return request<Game[]>(`/games${query}`);
}

export function getGame(id: string): Promise<Game> {
    return request<Game>(`/games/${id}`);
}

export function createGame(game: NewGame): Promise<Game> {
    return request<Game>('/games', {
        method: 'POST',
        body: JSON.stringify(game),
    });
}

export function updateGame(id: string, changes: GameUpdate): Promise<Game> {
    return request<Game>(`/games/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
    });
}

export function deleteGame(id: string): Promise<unknown> {
    return request<unknown>(`/games/${id}`, { method: 'DELETE' });
}
