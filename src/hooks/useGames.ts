import { useEffect, useState } from 'react';
import type { Game, GameUpdate, NewGame, StatusFilter } from '../types';
import { ApiError } from '../utils/client';
import {
    createGame,
    deleteGame,
    getGame,
    getGames,
    updateGame,
} from '../utils/games';

const getErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : 'Unknown error.';

// --- useGames: the list, optionally filtered by status ------------------------

export const useGames = (status: StatusFilter) => {
    const [games, setGames] = useState<Game[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [loadedStatus, setLoadedStatus] = useState<StatusFilter | null>(null);

    useEffect(() => {
        let ignore = false; 

        const fetchGames = async () => {
            try {
                const data = await getGames(status);
                if (ignore) return;
                setGames(data);
                setMessage(null);
            } catch (e) {
                if (ignore) return;
                setGames([]);
                setMessage(getErrorMessage(e));
            } finally {
                if (!ignore) setLoadedStatus(status);
            }
        };

        fetchGames();

        return () => {
            ignore = true;
        };
    }, [status]);

    const isLoading = loadedStatus !== status;

    return { games, message: isLoading ? null : message, isLoading };
};

// --- useGame: one game by id ---------------------------------------------------

export const useGame = (id: string | undefined) => {
    const [game, setGame] = useState<Game | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);
    // The id the current data belongs to. While it differs from `id` we are loading.
    const [loadedId, setLoadedId] = useState<string | null>(null);

    // Triggers on mount and whenever the id changes
    useEffect(() => {
        if (!id) return;
        let ignore = false;

        const fetchGame = async () => {
            try {
                const data = await getGame(id);
                if (ignore) return;
                setGame(data);
                setMessage(null);
                setNotFound(false);
            } catch (e) {
                if (ignore) return;
                setGame(null);
                setMessage(getErrorMessage(e));
                setNotFound(e instanceof ApiError && e.status === 404);
            } finally {
                if (!ignore) setLoadedId(id);
            }
        };

        fetchGame();

        return () => {
            ignore = true;
        };
    }, [id]);

    const isLoading = id !== undefined && loadedId !== id;

    return {
        game,
        setGame,
        message: isLoading ? null : message,
        isLoading,
        notFound,
    };
};

// --- useSaveGame: POST, PATCH and DELETE ----------------------------------------

export const useSaveGame = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const runRequest = async <T>(
        request: () => Promise<T>,
    ): Promise<T | null> => {
        setIsSaving(true);
        setMessage(null);
        try {
            return await request();
        } catch (e) {
            setMessage(getErrorMessage(e));
            return null;
        } finally {
            setIsSaving(false);
        }
    };

    const addGame = (game: NewGame) => runRequest(() => createGame(game));

    const editGame = (id: string, changes: GameUpdate) =>
        runRequest(() => updateGame(id, changes));

    const removeGame = async (id: string) => {
        const result = await runRequest(async () => {
            await deleteGame(id);
            return true;
        });
        return result === true;
    };

    const clearMessage = () => setMessage(null);

    return { isSaving, message, addGame, editGame, removeGame, clearMessage };
};
