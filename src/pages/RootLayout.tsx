import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import HandleForm from '../components/HandleForm';
import { getHandle, setHandle } from '../utils/handle';

export default function RootLayout() {
    const navigate = useNavigate();
    const [handle, setCurrentHandle] = useState(getHandle);

    function switchHandle(next: string) {
        setHandle(next); // update the stored handle first, so the new pages fetch with it
        setCurrentHandle(next);
        navigate('/'); // a game id from the old handle would be a 404 under the new one
    }

    return (
        <>
            <header>
                <h1>Questlog</h1>
                <nav>
                    <NavLink to="/" end>
                        Games
                    </NavLink>
                    <NavLink to="/games/new">New game</NavLink>
                </nav>
                <HandleForm handle={handle} onChange={switchHandle} />
            </header>
            <main>
                <Outlet key={handle} />{' '}
                {/* remounts the page, so it fetches again */}
            </main>
        </>
    );
}
