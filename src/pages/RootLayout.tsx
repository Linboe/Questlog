import { NavLink, Outlet } from 'react-router';

export default function RootLayout() {
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
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
