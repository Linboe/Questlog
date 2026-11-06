import { Route, Routes } from 'react-router';
import RootLayout from './pages/RootLayout';
import GamesPage from './pages/GamesPage';
import GameDetailPage from './pages/GameDetailPage';
import NewGamePage from './pages/NewGamePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route index element={<GamesPage />} />
                <Route path="games/new" element={<NewGamePage />} />
                <Route path="games/:id" element={<GameDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
