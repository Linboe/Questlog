import type { StatusFilter } from '../types';
import { useGames } from '../hooks/useGames';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Statusfilter from '../components/Statusfilter';
import GameList from '../components/GameList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function GamesPage() {
    const [filter, setFilter] = useLocalStorage<StatusFilter>(
        'questlog-filter',
        'all',
    );
    const { games, message, isLoading } = useGames(filter);

    return (
        <>
            <h2 className="page-title">My games</h2>
            <Statusfilter value={filter} onChange={setFilter} />
            {isLoading && <Loading message="Loading games..." />}
            {message && <ErrorMessage message={message} />}
            {!isLoading && !message && <GameList games={games} />}
        </>
    );
}
