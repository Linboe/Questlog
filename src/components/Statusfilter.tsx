import type { StatusFilter } from '../types';
import { FILTER_OPTIONS } from '../utils/status';

interface StatusfilterProps {
    value: StatusFilter;
    onChange: (value: StatusFilter) => void;
}

export default function Statusfilter({ value, onChange }: StatusfilterProps) {
    return (
        <div>
            {FILTER_OPTIONS.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    aria-pressed={value === option.value}
                    className={value === option.value ? 'active' : ''}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
