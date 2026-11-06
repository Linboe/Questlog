interface LoadingProps {
    message: string;
}

export default function Loading({ message }: LoadingProps) {
    return <p role="status">{message}</p>;
}
