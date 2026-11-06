import type { StatusFilter } from '../types';
import { FILTER_OPTIONS } from '../utils/status';

interface StatusfilterProps {
    value: StatusFilter;
    onChange: (value: StatusFilter) => void;
}

export default function Statusfilter({ value, onChange }: StatusfilterProps) {
    return (
        <div className="status-filter">
            {FILTER_OPTIONS.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className="status-filter__button"
                    onClick={() => onChange(option.value)}
                    aria-pressed={value === option.value}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
