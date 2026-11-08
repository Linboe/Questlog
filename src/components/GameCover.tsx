interface GameCoverProps {
    coverUrl: string;
    title: string;
    variant: 'card' | 'detail';
}

export default function GameCover({
    coverUrl,
    title,
    variant,
}: GameCoverProps) {
    const baseClass =
        variant === 'card' ? 'game-card__cover' : 'game-detail__cover';

    if (!coverUrl) {
        return (
            <div className={`${baseClass} ${baseClass}--empty`}>No cover</div>
        );
    }

    return <img className={baseClass} src={coverUrl} alt={`Cover: ${title}`} />;
}
