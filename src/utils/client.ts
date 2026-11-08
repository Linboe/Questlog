import { API_URL } from '../config';
import { getHandle } from './handle';

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export async function request<T>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    let response: Response;
    try {
        response = await fetch(`${API_URL}/${getHandle()}${path}`, {
            ...init,
            headers: init.body
                ? { 'Content-Type': 'application/json' }
                : undefined,
        });
    } catch {
        // fetch only rejects when the request never reached the server (offline, blocked, CORS)
        throw new Error(
            'Could not reach the server. Check your connection and try again.',
        );
    }

    if (!response.ok) {
        let message = `Something went wrong (status ${response.status}).`;
        try {
            // The API always returns errors as { message: "..." }
            const body = await response.json();
            if (typeof body?.message === 'string') message = body.message;
        } catch {
            // no JSON in the response, keep the default message
        }
        throw new ApiError(response.status, message);
    }

    return response.json() as Promise<T>;
}
