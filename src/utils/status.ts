import type { GameStatus, StatusFilter } from '../types';

export const STATUS_LABELS: Record<GameStatus, string> = {
    want: 'Want to play',
    playing: 'Playing',
    completed: 'Completed',
    dropped: 'Dropped',
};

export const STATUS_OPTIONS = Object.keys(STATUS_LABELS) as GameStatus[];

export const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    ...STATUS_OPTIONS.map((value) => ({ value, label: STATUS_LABELS[value] })),
];

export const isStatusFilter = (value: unknown): value is StatusFilter =>
    FILTER_OPTIONS.some((option) => option.value === value);
