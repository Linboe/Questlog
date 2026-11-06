import { API_BASE_URL } from '../config';

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
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: init.body ? { 'Content-Type': 'application/json' } : undefined,
    });

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
