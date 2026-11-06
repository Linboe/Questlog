import type { Game } from '../types';
import GameCard from './GameCard';

interface GameListProps {
    games: Game[];
}

export default function GameList({ games }: GameListProps) {
    if (games.length === 0) return <p>No games found.</p>;

    return (
        <ul>
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </ul>
    );
}
