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
            <header className="site-header">
                <div className="site-header__inner">
                    <h1 className="site-header__title">Questlog</h1>
                    <nav className="site-nav">
                        <NavLink to="/" end className="site-nav__link">
                            Games
                        </NavLink>
                        <NavLink to="/games/new" className="site-nav__link">
                            New game
                        </NavLink>
                    </nav>
                    <HandleForm handle={handle} onChange={switchHandle} />
                </div>
            </header>
            <main className="site-main">
                {/* key remounts the page when the handle changes, so it fetches again */}
                <Outlet key={handle} />
            </main>
        </>
    );
}
