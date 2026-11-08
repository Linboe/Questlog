import type { Game } from '../types';

interface GameInfoProps {
    game: Game;
}

export default function GameInfo({ game }: GameInfoProps) {
    return (
        <>
            <h2 className="game-detail__title">{game.title}</h2>
            <dl className="game-detail__facts">
                <dt>Platform</dt>
                <dd>{game.platform}</dd>
                <dt>Notes</dt>
                <dd>{game.notes || '–'}</dd>
            </dl>
        </>
    );
}
