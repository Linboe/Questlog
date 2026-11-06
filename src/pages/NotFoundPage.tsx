import { Link } from 'react-router';

export default function NotFoundPage() {
    return (
        <>
            <h2>404 – Page not found</h2>
            <Link to="/">Back to the list</Link>
        </>
    );
}
