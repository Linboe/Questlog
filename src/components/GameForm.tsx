import { useState, type FormEvent } from 'react';
import type { GameFormValues, GameStatus } from '../types';
import { STATUS_LABELS, STATUS_OPTIONS } from '../utils/status';

interface GameFormProps {
    onSubmit: (values: GameFormValues) => void;
    submitting: boolean;
    submitLabel?: string;
    initialValues?: GameFormValues;
    onCancel?: () => void;
}

export default function GameForm({
    onSubmit,
    submitting,
    submitLabel = 'Add game',
    initialValues,
    onCancel,
}: GameFormProps) {
    const [title, setTitle] = useState(initialValues?.title ?? '');
    const [platform, setPlatform] = useState(initialValues?.platform ?? '');
    const [status, setStatus] = useState<GameStatus>(
        initialValues?.status ?? 'want',
    );
    const [coverUrl, setCoverUrl] = useState(initialValues?.coverUrl ?? '');
    const [notes, setNotes] = useState(initialValues?.notes ?? '');

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        onSubmit({
            title: title.trim(),
            platform: platform.trim(),
            status,
            coverUrl: coverUrl.trim(),
            notes: notes.trim(),
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
            <div className="form__actions">
                <button type="submit" className="button" disabled={submitting}>
                    {submitting ? 'Saving...' : submitLabel}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={onCancel}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
