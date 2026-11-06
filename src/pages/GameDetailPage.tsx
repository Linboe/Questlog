import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Game, GameStatus, GameUpdate } from '../types';
import { ApiError } from '../utils/client';
import { deleteGame, getGame, updateGame } from '../utils/games';
import { STATUS_LABELS, STATUS_OPTIONS } from '../utils/status';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import NotFoundPage from './NotFoundPage';

export default function GameDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        let ignore = false;

        getGame(id)
            .then((data) => {
                if (!ignore) setGame(data);
            })
            .catch((e: unknown) => {
                if (!ignore)
                    setError(
                        e instanceof Error ? e : new Error('Unknown error.'),
                    );
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [id]);

    async function handleUpdate(changes: GameUpdate) {
        if (!id) return;
        setActionError(null);
        try {
            const updated = await updateGame(id, changes);
            setGame(updated);
        } catch (e) {
            setActionError(e instanceof Error ? e.message : 'Unknown error.');
        }
    }

    async function handleDelete() {
        if (!id || !window.confirm('Delete this game?')) return;
        setActionError(null);
        try {
            await deleteGame(id);
            navigate('/');
        } catch (e) {
            setActionError(e instanceof Error ? e.message : 'Unknown error.');
        }
    }

    if (loading) return <Loading message="Loading game..." />;
    if (error instanceof ApiError && error.status === 404)
        return <NotFoundPage />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!game) return null;

    return (
        <article>
            <Link to="/">← Back</Link>
            <h2>{game.title}</h2>
            {game.coverUrl && (
                <img src={game.coverUrl} alt={`Cover: ${game.title}`} />
            )}
            <p>Platform: {game.platform}</p>
            <p>Notes: {game.notes || '–'}</p>

            <label>
                Status
                <select
                    value={game.status}
                    onChange={(e) =>
                        handleUpdate({ status: e.target.value as GameStatus })
                    }
                >
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Rating
                <select
                    value={game.rating ?? ''}
                    onChange={(e) =>
                        handleUpdate({
                            rating:
                                e.target.value === ''
                                    ? null
                                    : Number(e.target.value),
                        })
                    }
                >
                    <option value="">No rating</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </label>

            {actionError && <ErrorMessage message={actionError} />}
            <button onClick={handleDelete}>Delete game</button>
        </article>
    );
}
