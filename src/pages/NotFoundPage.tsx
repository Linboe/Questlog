import { Link } from 'react-router';

export default function NotFoundPage() {
    return (
        <>
            <h2 className="page-title">404 – Page not found</h2>
            <Link to="/" className="back-link">
                Back to the list
            </Link>
        </>
    );
}
