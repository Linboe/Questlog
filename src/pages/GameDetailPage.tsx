import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { GameFormValues, GameUpdate } from '../types';
import { useGame, useSaveGame } from '../hooks/useGames';
import GameControls from '../components/GameControls';
import GameCover from '../components/GameCover';
import GameForm from '../components/GameForm';
import GameInfo from '../components/GameInfo';
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
                <GameCover
                    coverUrl={game.coverUrl}
                    title={game.title}
                    variant="detail"
                />

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
                            <GameInfo game={game} />
                            <GameControls game={game} onChange={handleUpdate} />

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
