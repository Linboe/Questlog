import type { Game } from '../types';
import GameCard from './GameCard';

interface GameListProps {
    games: Game[];
}

export default function GameList({ games }: GameListProps) {
    if (games.length === 0)
        return <p className="empty-state">No games found.</p>;

    return (
        <ul className="game-grid">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </ul>
    );
}
