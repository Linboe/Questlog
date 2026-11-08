import type { Game, GameUpdate } from '../types';
import StatusSelect from './StatusSelect';
import RatingSelect from './RatingSelect';

interface GameControlsProps {
    game: Game;
    onChange: (changes: GameUpdate) => void;
}

export default function GameControls({ game, onChange }: GameControlsProps) {
    return (
        <div className="game-detail__controls">
            <StatusSelect
                value={game.status}
                onChange={(status) => onChange({ status })}
            />
            <RatingSelect
                value={game.rating}
                onChange={(rating) => onChange({ rating })}
            />
        </div>
    );
}
