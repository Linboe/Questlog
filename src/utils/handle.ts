import { DEFAULT_HANDLE } from '../config';

const STORAGE_KEY = 'questlog-handle';

export const HANDLE_PATTERN = /^[a-z0-9-]{2,40}$/;

function readStoredHandle(): string {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && HANDLE_PATTERN.test(stored)) return stored;
    } catch {
        // storage unavailable, fall back to the default
    }
    return DEFAULT_HANDLE;
}

let currentHandle = readStoredHandle();

export function getHandle(): string {
    return currentHandle;
}

export function setHandle(handle: string): void {
    currentHandle = handle;
    try {
        localStorage.setItem(STORAGE_KEY, handle);
    } catch {
        // storage unavailable, the handle still works until the page is reloaded
    }
}
