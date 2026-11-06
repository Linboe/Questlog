import { Link } from 'react-router';
import type { Game } from '../types';
import { STATUS_LABELS } from '../utils/status';

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    return (
        <li className="game-card">
            <Link to={`/games/${game.id}`} className="game-card__link">
                {game.coverUrl ? (
                    <img
                        className="game-card__cover"
                        src={game.coverUrl}
                        alt={`Cover: ${game.title}`}
                    />
                ) : (
                    <div className="game-card__cover game-card__cover--empty">
                        No cover
                    </div>
                )}
                <div className="game-card__body">
                    <h3 className="game-card__title">{game.title}</h3>
                    <p className="game-card__meta">{game.platform}</p>
                    <span
                        className={`status-badge status-badge--${game.status}`}
                    >
                        {STATUS_LABELS[game.status]}
                    </span>
                </div>
            </Link>
        </li>
    );
}
