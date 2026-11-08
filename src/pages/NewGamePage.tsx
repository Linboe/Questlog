import { useNavigate } from 'react-router';
import type { GameFormValues, NewGame } from '../types';
import { useSaveGame } from '../hooks/useGames';
import GameForm from '../components/GameForm';
import ErrorMessage from '../components/ErrorMessage';

export default function NewGamePage() {
    const navigate = useNavigate();
    const { isSaving, message, addGame } = useSaveGame();

    async function handleSubmit(values: GameFormValues) {
        const { coverUrl, notes, ...required } = values;
        const game: NewGame = {
            ...required,
            ...(coverUrl ? { coverUrl } : {}),
            ...(notes ? { notes } : {}),
        };

        const created = await addGame(game);
        if (created) navigate(`/games/${created.id}`);
    }

    return (
        <>
            <h2 className="page-title">Add game</h2>
            {message && <ErrorMessage message={message} />}
            <GameForm onSubmit={handleSubmit} submitting={isSaving} />
        </>
    );
}
