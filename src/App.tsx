import { useEffect, useState } from 'react';
import { getGames } from './utils/games';
import type { Game } from './types';

export default function App() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        getGames('all')
            .then((data) => {
                console.log('Hämtade spel:', data);
                setGames(data);
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            <h1>Questlog</h1>
            <p>Antal spel hämtade: {games.length}</p>
        </div>
    );
}
