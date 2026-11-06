import { useEffect, useState } from 'react';
import type { Game, StatusFilter } from '../types';
import { getGames } from '../utils/games';
import Statusfilter from '../components/Statusfilter';
import GameList from '../components/GameList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function GamesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [filter, setFilter] = useState<StatusFilter>('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false; // a late response for an old filter must not overwrite a newer one

        getGames(filter)
            .then((data) => {
                if (!ignore) setGames(data);
            })
            .catch((e: unknown) => {
                if (!ignore)
                    setError(e instanceof Error ? e.message : 'Unknown error.');
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [filter]);

    function handleFilterChange(next: StatusFilter) {
        if (next === filter) return; // same filter: the effect would not re-run
        setLoading(true);
        setError(null);
        setFilter(next);
    }

    return (
        <>
            <h2 className="page-title">My games</h2>
            <Statusfilter value={filter} onChange={handleFilterChange} />
            {loading && <Loading message="Loading games..." />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && <GameList games={games} />}
        </>
    );
}
