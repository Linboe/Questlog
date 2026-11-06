import { useState, type FormEvent } from 'react';
import type { GameStatus, NewGame } from '../types';
import { STATUS_LABELS, STATUS_OPTIONS } from '../utils/status';

interface GameFormProps {
    onSubmit: (game: NewGame) => void;
    submitting: boolean;
}

export default function GameForm({ onSubmit, submitting }: GameFormProps) {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [status, setStatus] = useState<GameStatus>('want');

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        onSubmit({ title: title.trim(), platform: platform.trim(), status });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Platform
                <input
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    required
                />
            </label>
            <label>
                Status
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as GameStatus)}
                >
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Add game'}
            </button>
        </form>
    );
}
