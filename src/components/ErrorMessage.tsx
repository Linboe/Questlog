interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <p className="message message--error" role="alert">
            {message}
        </p>
    );
}
