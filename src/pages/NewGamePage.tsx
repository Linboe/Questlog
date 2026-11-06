import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { NewGame } from '../types';
import { createGame } from '../utils/games';
import GameForm from '../components/GameForm';
import ErrorMessage from '../components/ErrorMessage';

export default function NewGamePage() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(game: NewGame) {
        setSubmitting(true);
        setError(null);
        try {
            const created = await createGame(game);
            navigate(`/games/${created.id}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error.');
            setSubmitting(false);
        }
    }

    return (
        <>
            <h2 className="page-title">Add game</h2>
            {error && <ErrorMessage message={error} />}
            <GameForm onSubmit={handleSubmit} submitting={submitting} />
        </>
    );
}
