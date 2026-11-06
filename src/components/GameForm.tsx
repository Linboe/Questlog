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
    const [coverUrl, setCoverUrl] = useState('');
    const [notes, setNotes] = useState('');

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const trimmedCoverUrl = coverUrl.trim();
        const trimmedNotes = notes.trim();
        onSubmit({
            title: title.trim(),
            platform: platform.trim(),
            status,
            // optional fields: only sent when filled in
            ...(trimmedCoverUrl ? { coverUrl: trimmedCoverUrl } : {}),
            ...(trimmedNotes ? { notes: trimmedNotes } : {}),
        });
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label className="form__field">
                Title
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label className="form__field">
                Platform
                <input
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="e.g. PC, Switch, PlayStation 5"
                    required
                />
            </label>
            <label className="form__field">
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
            <label className="form__field">
                Cover image URL (optional)
                <input
                    type="url"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="https://..."
                />
            </label>
            <label className="form__field">
                Notes (optional)
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                />
            </label>
            <button type="submit" className="button" disabled={submitting}>
                {submitting ? 'Saving...' : 'Add game'}
            </button>
        </form>
    );
}
