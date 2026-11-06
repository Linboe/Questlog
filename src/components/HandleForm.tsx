import { useState, type FormEvent } from 'react';
import { HANDLE_PATTERN } from '../utils/handle';
import ErrorMessage from './ErrorMessage';

interface HandleFormProps {
    handle: string;
    onChange: (handle: string) => void;
}

export default function HandleForm({ handle, onChange }: HandleFormProps) {
    const [value, setValue] = useState(handle);
    const [error, setError] = useState<string | null>(null);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const next = value.trim().toLowerCase();

        if (!HANDLE_PATTERN.test(next)) {
            setError('Use 2-40 characters: a-z, 0-9 and "-".');
            return;
        }

        setError(null);
        setValue(next);
        if (next !== handle) onChange(next);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Handle
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
            <button type="submit">Switch</button>
            {error && <ErrorMessage message={error} />}
        </form>
    );
}
