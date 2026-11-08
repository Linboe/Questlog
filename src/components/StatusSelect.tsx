import type { GameStatus } from '../types';
import { STATUS_LABELS, STATUS_OPTIONS } from '../utils/status';

interface StatusSelectProps {
    value: GameStatus;
    onChange: (status: GameStatus) => void;
}

export default function StatusSelect({ value, onChange }: StatusSelectProps) {
    return (
        <label className="form__field">
            Status
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as GameStatus)}
            >
                {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                        {STATUS_LABELS[status]}
                    </option>
                ))}
            </select>
        </label>
    );
}
