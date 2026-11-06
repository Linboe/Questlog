import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Game, GameFormValues, GameStatus, GameUpdate } from '../types';
import { ApiError } from '../utils/client';
import { deleteGame, getGame, updateGame } from '../utils/games';
import { STATUS_LABELS, STATUS_OPTIONS } from '../utils/status';
import GameForm from '../components/GameForm';
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
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

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

    async function handleSave(values: GameFormValues) {
        if (!id) return;
        setSaving(true);
        setActionError(null);
        try {
            const updated = await updateGame(id, values);
            setGame(updated);
            setEditing(false);
        } catch (e) {
            setActionError(e instanceof Error ? e.message : 'Unknown error.');
        } finally {
            setSaving(false);
        }
    }

    function handleCancelEdit() {
        setActionError(null);
        setEditing(false);
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
        <article className="game-detail">
            <Link to="/" className="back-link">
                ← Back
            </Link>

            <div className="game-detail__layout">
                {game.coverUrl ? (
                    <img
                        className="game-detail__cover"
                        src={game.coverUrl}
                        alt={`Cover: ${game.title}`}
                    />
                ) : (
                    <div className="game-detail__cover game-detail__cover--empty">
                        No cover
                    </div>
                )}

                <div className="game-detail__info">
                    {editing ? (
                        <>
                            <h2 className="game-detail__title">Edit game</h2>
                            {actionError && (
                                <ErrorMessage message={actionError} />
                            )}
                            <GameForm
                                initialValues={{
                                    title: game.title,
                                    platform: game.platform,
                                    status: game.status,
                                    coverUrl: game.coverUrl,
                                    notes: game.notes,
                                }}
                                submitLabel="Save changes"
                                submitting={saving}
                                onSubmit={handleSave}
                                onCancel={handleCancelEdit}
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="game-detail__title">{game.title}</h2>

                            <dl className="game-detail__facts">
                                <dt>Platform</dt>
                                <dd>{game.platform}</dd>
                                <dt>Notes</dt>
                                <dd>{game.notes || '–'}</dd>
                            </dl>

                            <div className="game-detail__controls">
                                <label className="form__field">
                                    Status
                                    <select
                                        value={game.status}
                                        onChange={(e) =>
                                            handleUpdate({
                                                status: e.target
                                                    .value as GameStatus,
                                            })
                                        }
                                    >
                                        {STATUS_OPTIONS.map((s) => (
                                            <option key={s} value={s}>
                                                {STATUS_LABELS[s]}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="form__field">
                                    Rating
                                    <select
                                        value={game.rating ?? ''}
                                        onChange={(e) =>
                                            handleUpdate({
                                                rating:
                                                    e.target.value === ''
                                                        ? null
                                                        : Number(
                                                              e.target.value,
                                                          ),
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
                            </div>

                            {actionError && (
                                <ErrorMessage message={actionError} />
                            )}
                            <div className="game-detail__actions">
                                <button
                                    type="button"
                                    className="button button--secondary"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit game
                                </button>
                                <button
                                    type="button"
                                    className="button button--danger"
                                    onClick={handleDelete}
                                >
                                    Delete game
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}
