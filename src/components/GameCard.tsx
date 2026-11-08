import { Link } from 'react-router';
import type { Game } from '../types';
import { STATUS_LABELS } from '../utils/status';
import GameCover from './GameCover';

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    return (
        <li className="game-card">
            <Link to={`/games/${game.id}`} className="game-card__link">
                <GameCover
                    coverUrl={game.coverUrl}
                    title={game.title}
                    variant="card"
                />
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
