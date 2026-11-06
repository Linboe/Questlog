interface LoadingProps {
    message: string;
}

export default function Loading({ message }: LoadingProps) {
    return (
        <p className="message message--loading" role="status">
            {message}
        </p>
    );
}
