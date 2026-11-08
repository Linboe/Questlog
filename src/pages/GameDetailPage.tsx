import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { GameFormValues, GameStatus, GameUpdate } from '../types';
import { useGame, useSaveGame } from '../hooks/useGames';
import { STATUS_LABELS, STATUS_OPTIONS } from '../utils/status';
import GameForm from '../components/GameForm';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import NotFoundPage from './NotFoundPage';

export default function GameDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { game, setGame, message, isLoading, notFound } = useGame(id);
    const {
        isSaving,
        message: saveMessage,
        editGame,
        removeGame,
        clearMessage,
    } = useSaveGame();
    const [isEditing, setIsEditing] = useState(false);

    async function handleUpdate(changes: GameUpdate) {
        if (!id) return;
        const updated = await editGame(id, changes);
        if (updated) setGame(updated);
    }

    async function handleSave(values: GameFormValues) {
        if (!id) return;
        const updated = await editGame(id, values);
        if (updated) {
            setGame(updated);
            setIsEditing(false);
        }
    }

    function handleCancelEdit() {
        clearMessage();
        setIsEditing(false);
    }

    async function handleDelete() {
        if (!id || !window.confirm('Delete this game?')) return;
        const deleted = await removeGame(id);
        if (deleted) navigate('/');
    }

    if (isLoading) return <Loading message="Loading game..." />;
    if (notFound) return <NotFoundPage />;
    if (message) return <ErrorMessage message={message} />;
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
                    {isEditing ? (
                        <>
                            <h2 className="game-detail__title">Edit game</h2>
                            {saveMessage && (
                                <ErrorMessage message={saveMessage} />
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
                                submitting={isSaving}
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

                            {saveMessage && (
                                <ErrorMessage message={saveMessage} />
                            )}
                            <div className="game-detail__actions">
                                <button
                                    type="button"
                                    className="button button--secondary"
                                    onClick={() => setIsEditing(true)}
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
