import { CheckCircleIcon, XCircleIcon } from "lucide-react";

interface ToastMessageProps {
    message: string;
}

export function ToastSuccessMessage({ message }: ToastMessageProps) {
    return (
        <div className="flex flex-row items-center">
            <CheckCircleIcon className="mr-2 h-4 w-4 text-green-600" />
            <span>{message}</span>
        </div>
    );
}

export function ToastErrorMessage({ message }: ToastMessageProps) {
    return (
        <div className="flex flex-row items-center">
            <XCircleIcon className="mr-2 h-4 w-4" />
            <span>{message}</span>
        </div>
    );
}
