import { Link } from 'react-router-dom';
import type { Game } from '../types';
import { STATUS_LABELS } from '../utils/status';

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    return (
        <li>
            <Link to={`/games/${game.id}`}>
                {game.coverUrl && (
                    <img src={game.coverUrl} alt={`Cover: ${game.title}`} />
                )}
                <h3>{game.title}</h3>
                <p>
                    {game.platform} · {STATUS_LABELS[game.status]}
                </p>
            </Link>
        </li>
    );
}
